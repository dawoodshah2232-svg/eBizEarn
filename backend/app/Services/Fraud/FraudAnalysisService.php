<?php

namespace App\Services\Fraud;

use App\Models\FraudEvent;
use App\Models\TaskAssignment;
use App\Models\TaskSubmission;
use App\Models\User;

class FraudAnalysisService
{
    /**
     * Evaluate fraud risk for a submission.
     *
     * @return array{risk_level: string, fraud_score: int, flags: array<string>}
     */
    public function evaluateSubmission(TaskSubmission $submission): array
    {
        $flags = [];
        $score = 5; // Base clean score

        // 1. Check completion speed
        if ($submission->assignment) {
            $started = $submission->assignment->started_at;
            $durationSeconds = $started ? $submission->created_at->diffInSeconds($started) : 60;
            $minEstimatedSeconds = ($submission->task->estimated_minutes ?? 5) * 60;

            // Inhumanly fast completion (e.g. less than 15% of expected time)
            if ($durationSeconds < max(10, $minEstimatedSeconds * 0.15)) {
                $flags[] = 'suspicious_rapid_completion';
                $score += 35;
            }
        }

        // 2. Check duplicate URL submissions
        $submittedUrl = $submission->proof_data_json['url'] ?? null;
        if (!empty($submittedUrl)) {
            $duplicateCount = TaskSubmission::where('id', '!=', $submission->id)
                ->whereJsonContains('proof_data_json->url', $submittedUrl)
                ->count();

            if ($duplicateCount > 0) {
                $flags[] = 'duplicate_url_reused';
                $score += 50;
            }
        }

        // 3. Check user rejection history
        $user = $submission->user;
        if ($user && $user->profile) {
            if ($user->profile->fraud_score > 30) {
                $flags[] = 'elevated_user_historical_risk';
                $score += 20;
            }
        }

        // Determine level
        $level = match (true) {
            $score >= 75 => 'critical',
            $score >= 50 => 'high',
            $score >= 25 => 'medium',
            default => 'low',
        };

        // Log fraud event if medium or higher
        if (in_array($level, ['medium', 'high', 'critical'], true)) {
            FraudEvent::create([
                'user_id' => $submission->user_id,
                'submission_id' => $submission->id,
                'event_type' => $flags[0] ?? 'anomaly_detected',
                'severity' => $level,
                'details_json' => [
                    'flags' => $flags,
                    'calculated_score' => $score,
                    'duration_seconds' => $durationSeconds ?? null,
                ],
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
                'status' => 'flagged',
            ]);
        }

        return [
            'risk_level' => $level,
            'fraud_score' => min(100, $score),
            'flags' => $flags,
        ];
    }
}
