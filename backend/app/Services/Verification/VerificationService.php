<?php

namespace App\Services\Verification;

use App\Models\AiVerificationResult;
use App\Models\AuditLog;
use App\Models\Referral;
use App\Models\TaskAssignment;
use App\Models\TaskSubmission;
use App\Models\User;
use App\Models\Wallet;
use App\Services\AI\AIProviderInterface;
use App\Services\AI\MockAIProvider;
use App\Services\Fraud\FraudAnalysisService;
use App\Services\Wallet\WalletLedgerService;
use Exception;
use Illuminate\Support\Facades\DB;

class VerificationService
{
    public function __construct(
        protected AIProviderInterface $aiProvider = new MockAIProvider(),
        protected FraudAnalysisService $fraudService = new FraudAnalysisService(),
        protected WalletLedgerService $walletService = new WalletLedgerService()
    ) {}

    /**
     * Run AI pre-check and fraud analysis for a new submission.
     */
    public function processNewSubmission(TaskSubmission $submission): AiVerificationResult
    {
        // 1. Run AI analysis
        $aiData = $this->aiProvider->analyzeSubmission($submission);

        // 2. Run fraud analysis
        $fraudData = $this->fraudService->evaluateSubmission($submission);

        // Merge fraud risk into AI result
        $finalRisk = max($aiData['risk_score'], $fraudData['fraud_score']);

        return AiVerificationResult::updateOrCreate(
            ['submission_id' => $submission->id],
            [
                'confidence_score' => $aiData['confidence_score'],
                'risk_score' => $finalRisk,
                'duplicate_risk' => $aiData['duplicate_risk'],
                'proof_quality' => $aiData['proof_quality'],
                'content_match' => $aiData['content_match'],
                'policy_match' => $aiData['policy_match'],
                'suggested_decision' => $finalRisk >= 50 ? 'flag' : $aiData['suggested_decision'],
                'analysis_summary' => $aiData['analysis_summary'],
                'raw_payload_json' => array_merge($aiData['raw_payload'], ['fraud_analysis' => $fraudData]),
            ]
        );
    }

    /**
     * Admin/Reviewer executes a decision with mandatory reasoning and atomic balance credit.
     */
    public function recordDecision(
        TaskSubmission $submission,
        User $reviewer,
        string $decision, // 'approved', 'rejected', 'action_required'
        string $notes
    ): TaskSubmission {
        if (!in_array($decision, ['approved', 'rejected', 'action_required'], true)) {
            throw new Exception('Invalid decision option.');
        }

        return DB::transaction(function () use ($submission, $reviewer, $decision, $notes) {
            $lockedSubmission = TaskSubmission::where('id', $submission->id)->lockForUpdate()->firstOrFail();

            if ($lockedSubmission->status === 'approved') {
                throw new Exception('Submission is already approved.');
            }

            $beforeState = $lockedSubmission->toArray();

            $lockedSubmission->update([
                'status' => $decision,
                'reviewer_id' => $reviewer->id,
                'reviewed_at' => now(),
                'review_notes' => $notes,
            ]);

            // Update assignment
            if ($lockedSubmission->assignment) {
                $assignmentStatus = $decision === 'approved' ? 'completed' : ($decision === 'rejected' ? 'cancelled' : 'in_progress');
                $lockedSubmission->assignment->update([
                    'status' => $assignmentStatus,
                    'completed_at' => $decision === 'approved' ? now() : null,
                ]);
            }

            if ($decision === 'approved') {
                $task = $lockedSubmission->task;
                $campaign = $task->campaign;
                $rewardCents = $task->reward_cents;

                // 1. Credit Contributor Wallet
                $wallet = Wallet::firstOrCreate(
                    ['user_id' => $lockedSubmission->user_id],
                    ['currency' => 'USD', 'available_balance_cents' => 0]
                );

                $this->walletService->credit(
                    $wallet,
                    $rewardCents,
                    'task_reward',
                    "Reward for completing: {$task->title}",
                    TaskSubmission::class,
                    $lockedSubmission->id,
                    ['task_id' => $task->id, 'campaign_id' => $campaign->id]
                );

                // 2. Update Contributor Profile Stats
                $profile = $lockedSubmission->user->profile;
                if ($profile) {
                    $profile->increment('completed_tasks_count');
                }

                // 3. Update Campaign budget and count
                if ($campaign) {
                    $campaign->increment('completed_contributors_count');
                    $campaign->decrement('reserved_budget_cents', min($campaign->reserved_budget_cents, $rewardCents));
                }

                // 4. Check Referral Qualification
                $this->checkReferralQualification($lockedSubmission->user);
            }

            // Audit Log
            AuditLog::create([
                'actor_id' => $reviewer->id,
                'action' => "submission.{$decision}",
                'entity_type' => TaskSubmission::class,
                'entity_id' => $lockedSubmission->id,
                'before_state_json' => $beforeState,
                'after_state_json' => $lockedSubmission->fresh()->toArray(),
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
                'created_at' => now(),
            ]);

            return $lockedSubmission->fresh();
        });
    }

    /**
     * Qualify referral reward upon legitimate task completion.
     */
    protected function checkReferralQualification(User $contributor): void
    {
        $referral = Referral::where('referred_user_id', $contributor->id)
            ->where('status', 'pending')
            ->first();

        if ($referral) {
            $referral->update([
                'status' => 'qualified',
                'qualified_at' => now(),
            ]);

            // Credit referrer wallet
            $referrerWallet = Wallet::firstOrCreate(
                ['user_id' => $referral->referrer_id],
                ['currency' => 'USD', 'available_balance_cents' => 0]
            );

            $this->walletService->credit(
                $referrerWallet,
                $referral->reward_cents,
                'referral_reward',
                "Referral bonus for friend completing first verified task",
                Referral::class,
                $referral->id
            );

            $referral->update(['status' => 'rewarded']);
        }
    }
}
