<?php

namespace App\Services\AI;

use App\Models\TaskSubmission;

interface AIProviderInterface
{
    /**
     * Analyze a submission for quality, authenticity, duplicate probability, and instruction compliance.
     *
     * @return array{
     *   confidence_score: int,
     *   risk_score: int,
     *   duplicate_risk: int,
     *   proof_quality: int,
     *   content_match: int,
     *   policy_match: int,
     *   suggested_decision: string,
     *   analysis_summary: string,
     *   raw_payload: array
     * }
     */
    public function analyzeSubmission(TaskSubmission $submission): array;
}
