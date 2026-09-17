<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\SubmissionFile;
use App\Models\Task;
use App\Models\TaskAssignment;
use App\Models\TaskSubmission;
use App\Services\Verification\VerificationService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public function __construct(
        protected VerificationService $verificationService = new VerificationService()
    ) {}

    /**
     * Browse available tasks with filtering, search, and pagination.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Task::with(['category', 'campaign.business'])
            ->where('status', 'available');

        // Filter by category slug
        if ($request->filled('category')) {
            $categorySlug = $request->input('category');
            $query->whereHas('category', function ($q) use ($categorySlug) {
                $q->where('slug', $categorySlug);
            });
        }

        // Search in title or description
        if ($request->filled('search')) {
            $search = '%' . $request->input('search') . '%';
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', $search)
                  ->orWhereHas('campaign', function ($cq) use ($search) {
                      $cq->where('description', 'like', $search);
                  });
            });
        }

        // Filter by difficulty
        if ($request->filled('difficulty')) {
            $query->where('difficulty', $request->input('difficulty'));
        }

        // Sorting
        $sortBy = $request->input('sort', 'newest');
        match ($sortBy) {
            'reward_desc' => $query->orderByDesc('reward_cents'),
            'reward_asc' => $query->orderBy('reward_cents'),
            'time_asc' => $query->orderBy('estimated_minutes'),
            default => $query->latest(),
        };

        $tasks = $query->paginate($request->input('per_page', 12));

        return response()->json([
            'success' => true,
            'data' => $tasks->items(),
            'meta' => [
                'current_page' => $tasks->currentPage(),
                'last_page' => $tasks->lastPage(),
                'per_page' => $tasks->perPage(),
                'total' => $tasks->total(),
            ],
        ]);
    }

    /**
     * Get detailed task information including campaign guidelines and proof requirements.
     */
    public function show(string $id): JsonResponse
    {
        $task = Task::with(['category', 'campaign.business'])
            ->where('id', $id)
            ->orWhere('uuid', $id)
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $task,
        ]);
    }

    /**
     * Start/reserve a task for the authenticated contributor.
     */
    public function start(Request $request, string $id): JsonResponse
    {
        $user = $request->user();
        $task = Task::where('id', $id)->orWhere('uuid', $id)->firstOrFail();

        if ($task->status !== 'available' || $task->slots_taken >= $task->slots_total) {
            return response()->json([
                'success' => false,
                'message' => 'This task is no longer available or has reached capacity.',
            ], 400);
        }

        // Check existing active assignment
        $existing = TaskAssignment::where('task_id', $task->id)
            ->where('user_id', $user->id)
            ->whereIn('status', ['reserved', 'in_progress', 'submitted'])
            ->first();

        if ($existing) {
            return response()->json([
                'success' => true,
                'message' => 'Task already started.',
                'data' => $existing->load('task.campaign'),
            ]);
        }

        $assignment = DB::transaction(function () use ($task, $user) {
            $task->increment('slots_taken');

            return TaskAssignment::create([
                'task_id' => $task->id,
                'user_id' => $user->id,
                'status' => 'in_progress',
                'reserved_until' => now()->addHours(2), // 2 hours reservation window
                'started_at' => now(),
            ]);
        });

        return response()->json([
            'success' => true,
            'message' => 'Task started successfully.',
            'data' => $assignment->load('task.campaign'),
        ], 201);
    }

    /**
     * Submit proof for a task assignment.
     */
    public function submit(Request $request, string $id): JsonResponse
    {
        $user = $request->user();
        $task = Task::where('id', $id)->orWhere('uuid', $id)->firstOrFail();

        $assignment = TaskAssignment::where('task_id', $task->id)
            ->where('user_id', $user->id)
            ->whereIn('status', ['in_progress', 'reserved'])
            ->first();

        if (!$assignment) {
            // Auto-create assignment if not explicitly reserved
            $assignment = TaskAssignment::create([
                'task_id' => $task->id,
                'user_id' => $user->id,
                'status' => 'in_progress',
                'started_at' => now()->subMinutes(5),
            ]);
            $task->increment('slots_taken');
        }

        $validator = Validator::make($request->all(), [
            'proof_url' => 'nullable|url|max:2000',
            'proof_screenshot' => 'nullable|string', // Base64 or uploaded URL
            'text_answer' => 'nullable|string|max:5000',
            'note' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $proofData = [
            'url' => $request->input('proof_url'),
            'text_answer' => $request->input('text_answer'),
            'note' => $request->input('note'),
            'submitted_ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ];

        $submission = DB::transaction(function () use ($task, $user, $assignment, $proofData, $request) {
            $sub = TaskSubmission::create([
                'task_id' => $task->id,
                'user_id' => $user->id,
                'assignment_id' => $assignment->id,
                'status' => 'under_review',
                'proof_data_json' => $proofData,
            ]);

            $assignment->update([
                'status' => 'submitted',
                'completed_at' => now(),
            ]);

            // Save screenshot file entry if provided
            $screenshot = $request->input('proof_screenshot');
            if (!empty($screenshot)) {
                SubmissionFile::create([
                    'submission_id' => $sub->id,
                    'file_type' => 'screenshot',
                    'file_path' => 'proofs/' . $sub->uuid . '.png',
                    'file_url' => $screenshot,
                    'file_size_bytes' => 1024 * 512,
                    'mime_type' => 'image/png',
                ]);
            }

            return $sub;
        });

        // Run AI Pre-Check & Fraud Analysis
        $aiResult = $this->verificationService->processNewSubmission($submission);

        return response()->json([
            'success' => true,
            'message' => 'Submission received and placed under review.',
            'data' => [
                'submission' => $submission->load(['task.campaign', 'files', 'aiResult']),
                'ai_precheck' => [
                    'confidence_score' => $aiResult->confidence_score,
                    'suggested_decision' => $aiResult->suggested_decision,
                    'summary' => $aiResult->analysis_summary,
                ],
            ],
        ], 201);
    }

    /**
     * Get Contributor Dashboard Overview stats.
     */
    public function contributorDashboard(Request $request): JsonResponse
    {
        $user = $request->user();
        $wallet = $user->wallet ?? Wallet::firstOrCreate(['user_id' => $user->id]);

        $completedCount = TaskSubmission::where('user_id', $user->id)->where('status', 'approved')->count();
        $pendingCount = TaskSubmission::where('user_id', $user->id)->whereIn('status', ['submitted', 'under_review'])->count();

        // Calculate today's earnings
        $todayCents = DB::table('wallet_transactions')
            ->where('wallet_id', $wallet->id)
            ->where('amount_cents', '>', 0)
            ->whereDate('created_at', now()->toDateString())
            ->sum('amount_cents');

        // Recommended tasks
        $recommendedTasks = Task::with(['category', 'campaign.business'])
            ->where('status', 'available')
            ->latest()
            ->take(5)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'user' => [
                    'name' => $user->name,
                    'level' => $user->profile?->contributor_level ?? 'starter',
                    'avatar' => $user->profile?->avatar_url,
                ],
                'stats' => [
                    'available_balance_cents' => $wallet->available_balance_cents,
                    'pending_balance_cents' => $wallet->pending_balance_cents,
                    'today_earnings_cents' => $todayCents,
                    'completed_tasks_count' => $completedCount,
                    'pending_tasks_count' => $pendingCount,
                ],
                'recommended_tasks' => $recommendedTasks,
            ],
        ]);
    }

    /**
     * Contributor's task history and active assignments.
     */
    public function myTasks(Request $request): JsonResponse
    {
        $user = $request->user();
        $status = $request->input('status'); // submitted, under_review, approved, rejected

        $query = TaskSubmission::with(['task.category', 'task.campaign.business', 'files', 'aiResult'])
            ->where('user_id', $user->id);

        if (!empty($status)) {
            $query->where('status', $status);
        }

        $submissions = $query->latest()->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $submissions->items(),
            'meta' => [
                'current_page' => $submissions->currentPage(),
                'last_page' => $submissions->lastPage(),
                'total' => $submissions->total(),
            ],
        ]);
    }
}
