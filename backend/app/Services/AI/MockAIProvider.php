<?php

namespace App\Services\AI;

use App\Models\SubmissionFile;
use App\Models\TaskSubmission;

class MockAIProvider implements AIProviderInterface
{
    public function analyzeSubmission(TaskSubmission $submission): array
    {
        // Load files
        $files = $submission->files;
        $proofData = $submission->proof_data_json ?? [];
        $hasUrl = !empty($proofData['url']);
        $hasText = !empty($proofData['text_answer']) || !empty($proofData['note']);
        $hasFile = $files->count() > 0;

        // Base confidence
        $confidenceScore = 93;
        $proofQuality = 92;
        $contentMatch = 94;
        $policyMatch = 98;
        $duplicateRisk = 4;
        $riskScore = 8;
        $suggestedDecision = 'approve';

        // Check if submission is empty
        if (!$hasUrl && !$hasText && !$hasFile) {
            $confidenceScore = 15;
            $riskScore = 85;
            $proofQuality = 20;
            $contentMatch = 10;
            $suggestedDecision = 'reject';
            $summary = 'Incomplete submission: no proof file, URL, or textual confirmation provided.';
        } elseif ($hasFile) {
            $summary = 'Proof screenshot verified: valid resolution, timestamp matches campaign window, visual content corresponds with campaign guidelines (authenticity index 94.2%). No duplicate image hash found.';
        } elseif ($hasUrl) {
            $summary = 'Live link validated: URL reachable, destination metadata and campaign tags verified against target instructions.';
        } else {
            $summary = 'Text response analyzed: relevant keywords and confirmation criteria met with high semantic similarity.';
        }

        return [
            'confidence_score' => $confidenceScore,
            'risk_score' => $riskScore,
            'duplicate_risk' => $duplicateRisk,
            'proof_quality' => $proofQuality,
            'content_match' => $contentMatch,
            'policy_match' => $policyMatch,
            'suggested_decision' => $suggestedDecision,
            'analysis_summary' => $summary,
            'raw_payload' => [
                'provider' => 'mock_vision_ai_v2',
                'latency_ms' => 342,
                'model' => 'biznetwork-vision-guard-1.0',
                'tags_detected' => ['social_post', 'verified_engagement', 'brand_mention'],
            ],
        ];
    }
}
