<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Business;
use App\Models\Campaign;
use App\Models\Task;
use App\Models\TaskSubmission;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class BusinessCampaignController extends Controller
{
    /**
     * Get Business Dashboard Overview.
     */
    public function dashboard(Request $request): JsonResponse
    {
        $user = $request->user();
        $business = $user->business;

        if (!$business) {
            return response()->json([
                'success' => false,
                'message' => 'No business account associated with this user.',
            ], 404);
        }

        $campaigns = Campaign::where('business_id', $business->id)->get();

        $activeCount = $campaigns->where('status', 'active')->count();
        $totalBudget = $campaigns->sum('total_budget_cents');
        $remainingBudget = $campaigns->sum('remaining_budget_cents');
        $spentBudget = $totalBudget - $remainingBudget;
        $verifiedTasks = $campaigns->sum('completed_contributors_count');
        $avgCostCents = $verifiedTasks > 0 ? (int) round($spentBudget / $verifiedTasks) : 0;

        // Recent submissions for this business
        $recentSubmissions = TaskSubmission::whereHas('task.campaign', function ($q) use ($business) {
            $q->where('business_id', $business->id);
        })->with(['task', 'user.profile', 'aiResult'])->latest()->take(6)->get();

        return response()->json([
            'success' => true,
            'data' => [
                'business' => $business,
                'metrics' => [
                    'active_campaigns' => $activeCount,
                    'total_campaigns' => $campaigns->count(),
                    'verified_tasks' => $verifiedTasks,
                    'total_budget_cents' => $totalBudget,
                    'spent_budget_cents' => $spentBudget,
                    'remaining_budget_cents' => $remainingBudget,
                    'average_cost_cents' => $avgCostCents,
                ],
                'recent_submissions' => $recentSubmissions,
                'active_campaigns_list' => $campaigns->where('status', 'active')->values(),
            ],
        ]);
    }

    /**
     * List all campaigns for the authenticated business.
     */
    public function index(Request $request): JsonResponse
    {
        $business = $request->user()->business;
        if (!$business) {
            return response()->json(['success' => false, 'message' => 'Business profile not found.'], 404);
        }

        $campaigns = Campaign::with(['category', 'tasks'])
            ->where('business_id', $business->id)
            ->latest()
            ->paginate(15);

        return response()->json([
            'success' => true,
            'data' => $campaigns->items(),
            'meta' => [
                'current_page' => $campaigns->currentPage(),
                'last_page' => $campaigns->lastPage(),
                'total' => $campaigns->total(),
            ],
        ]);
    }

    /**
     * Create a new campaign from the 6-step wizard.
     */
    public function store(Request $request): JsonResponse
    {
        $business = $request->user()->business;
        if (!$business) {
            return response()->json(['success' => false, 'message' => 'Business profile not found.'], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'objective' => 'nullable|string|max:255',
            'description' => 'required|string',
            'category_id' => 'required|exists:task_categories,id',
            'reward_per_task_cents' => 'required|integer|min:20', // Min $0.20
            'target_contributors_count' => 'required|integer|min:5',
            'instructions_markdown' => 'required|string',
            'proof_requirements_json' => 'nullable|array',
            'target_countries' => 'nullable|array',
            'target_languages' => 'nullable|array',
            'min_contributor_level' => 'nullable|in:starter,explorer,trusted,pro,elite',
            'retention_hours' => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $validated = $validator->validated();

        // Calculate budget & platform fee
        $rewardPerTask = (int) $validated['reward_per_task_cents'];
        $contributorCount = (int) $validated['target_contributors_count'];
        $tasksBudget = $rewardPerTask * $contributorCount;
        $feePercent = config('platform.platformFeePercent', 15);
        $platformFee = (int) round($tasksBudget * ($feePercent / 100));
        $totalBudget = $tasksBudget + $platformFee;

        $campaign = DB::transaction(function () use ($business, $validated, $rewardPerTask, $contributorCount, $totalBudget, $platformFee) {
            $camp = Campaign::create([
                'uuid' => (string) Str::uuid(),
                'business_id' => $business->id,
                'category_id' => $validated['category_id'],
                'title' => $validated['title'],
                'objective' => $validated['objective'] ?? null,
                'description' => $validated['description'],
                'instructions_markdown' => $validated['instructions_markdown'],
                'proof_requirements_json' => $validated['proof_requirements_json'] ?? ['screenshot' => true, 'url' => true],
                'status' => 'active',
                'total_budget_cents' => $totalBudget,
                'remaining_budget_cents' => $totalBudget,
                'reserved_budget_cents' => 0,
                'reward_per_task_cents' => $rewardPerTask,
                'platform_fee_cents' => $platformFee,
                'target_contributors_count' => $contributorCount,
                'target_countries_json' => $validated['target_countries'] ?? ['ALL'],
                'target_languages_json' => $validated['target_languages'] ?? ['en'],
                'min_contributor_level' => $validated['min_contributor_level'] ?? 'starter',
                'retention_hours' => $validated['retention_hours'] ?? 24,
                'starts_at' => now(),
            ]);

            // Create initial active Task pool
            Task::create([
                'uuid' => (string) Str::uuid(),
                'campaign_id' => $camp->id,
                'category_id' => $camp->category_id,
                'title' => $camp->title,
                'reward_cents' => $rewardPerTask,
                'estimated_minutes' => 5,
                'difficulty' => 'easy',
                'status' => 'available',
                'slots_total' => $contributorCount,
                'slots_taken' => 0,
            ]);

            return $camp;
        });

        return response()->json([
            'success' => true,
            'message' => 'Campaign created and launched successfully.',
            'data' => $campaign->load(['category', 'tasks']),
        ], 201);
    }

    /**
     * Get single campaign details with metrics.
     */
    public function show(Request $request, string $id): JsonResponse
    {
        $business = $request->user()->business;
        $campaign = Campaign::with(['category', 'tasks'])
            ->where('business_id', $business->id)
            ->where(fn($q) => $q->where('id', $id)->orWhere('uuid', $id))
            ->firstOrFail();

        $submissions = TaskSubmission::whereHas('task', fn($q) => $q->where('campaign_id', $campaign->id))
            ->with(['user.profile', 'aiResult', 'files'])
            ->latest()
            ->paginate(15);

        return response()->json([
            'success' => true,
            'data' => [
                'campaign' => $campaign,
                'submissions' => $submissions,
            ],
        ]);
    }

    /**
     * Toggle campaign status (pause/resume).
     */
    public function updateStatus(Request $request, string $id): JsonResponse
    {
        $business = $request->user()->business;
        $campaign = Campaign::where('business_id', $business->id)
            ->where(fn($q) => $q->where('id', $id)->orWhere('uuid', $id))
            ->firstOrFail();

        $status = $request->input('status');
        if (!in_array($status, ['active', 'paused', 'cancelled'], true)) {
            return response()->json(['success' => false, 'message' => 'Invalid status option.'], 422);
        }

        $campaign->update(['status' => $status]);
        $campaign->tasks()->update(['status' => $status === 'active' ? 'available' : 'paused']);

        return response()->json([
            'success' => true,
            'message' => "Campaign is now {$status}.",
            'data' => $campaign,
        ]);
    }

    /**
     * Get all submissions across business campaigns.
     */
    public function submissions(Request $request): JsonResponse
    {
        $business = $request->user()->business;
        $submissions = TaskSubmission::whereHas('task.campaign', fn($q) => $q->where('business_id', $business->id))
            ->with(['task.category', 'user.profile', 'files', 'aiResult'])
            ->latest()
            ->paginate(20);

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
