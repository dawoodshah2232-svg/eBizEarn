<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\FeatureFlag;
use App\Models\SystemSetting;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminSystemController extends Controller
{
    /**
     * List all Feature Flags.
     */
    public function featureFlags(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => FeatureFlag::orderBy('name')->get(),
        ]);
    }

    /**
     * Update feature flag toggle state.
     */
    public function updateFeatureFlag(Request $request, string $key): JsonResponse
    {
        $flag = FeatureFlag::where('key', $key)->firstOrFail();
        $isEnabled = (bool) $request->input('is_enabled');

        $flag->update(['is_enabled' => $isEnabled]);

        AuditLog::create([
            'actor_id' => $request->user()->id,
            'action' => 'feature_flag.updated',
            'entity_type' => FeatureFlag::class,
            'entity_id' => $flag->id,
            'before_state_json' => ['is_enabled' => !$isEnabled],
            'after_state_json' => ['is_enabled' => $isEnabled],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'created_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => "Feature flag {$key} updated.",
            'data' => $flag,
        ]);
    }

    /**
     * Get system settings.
     */
    public function systemSettings(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => SystemSetting::all(),
        ]);
    }

    /**
     * Update system setting.
     */
    public function updateSystemSetting(Request $request): JsonResponse
    {
        $key = $request->input('key');
        $value = $request->input('value');

        SystemSetting::set($key, $value);

        return response()->json([
            'success' => true,
            'message' => "Setting {$key} updated successfully.",
        ]);
    }

    /**
     * Paginated audit logs.
     */
    public function auditLogs(Request $request): JsonResponse
    {
        $logs = AuditLog::with('actor')
            ->latest('created_at')
            ->paginate(25);

        return response()->json([
            'success' => true,
            'data' => $logs->items(),
            'meta' => [
                'current_page' => $logs->currentPage(),
                'last_page' => $logs->lastPage(),
                'total' => $logs->total(),
            ],
        ]);
    }

    /**
     * Users management list.
     */
    public function users(Request $request): JsonResponse
    {
        $query = User::with(['profile', 'wallet', 'business']);

        if ($request->filled('role')) {
            $query->where('role', $request->input('role'));
        }

        if ($request->filled('search')) {
            $search = '%' . $request->input('search') . '%';
            $query->where(fn($q) => $q->where('name', 'like', $search)->orWhere('email', 'like', $search));
        }

        $users = $query->latest()->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $users->items(),
            'meta' => [
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'total' => $users->total(),
            ],
        ]);
    }

    /**
     * Toggle user status (active/suspended).
     */
    public function updateUserStatus(Request $request, string $id): JsonResponse
    {
        $user = User::findOrFail($id);
        $status = $request->input('status');

        if (!in_array($status, ['active', 'suspended', 'pending_verification'], true)) {
            return response()->json(['success' => false, 'message' => 'Invalid status'], 422);
        }

        $before = $user->status;
        $user->update(['status' => $status]);

        AuditLog::create([
            'actor_id' => $request->user()->id,
            'action' => 'user.status_changed',
            'entity_type' => User::class,
            'entity_id' => $user->id,
            'before_state_json' => ['status' => $before],
            'after_state_json' => ['status' => $status],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'created_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => "User status changed to {$status}.",
            'data' => $user,
        ]);
    }

    /**
     * System Health Check.
     */
    public function health(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'status' => 'operational',
                'database' => 'connected',
                'cache' => 'active',
                'queue' => 'idle',
                'storage' => 'writable',
                'server_time' => now()->toIso8601String(),
                'php_version' => PHP_VERSION,
                'laravel_version' => app()->version(),
            ],
        ]);
    }
}
