<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\FeatureFlag;
use App\Models\SystemSetting;
use App\Models\TaskCategory;
use Illuminate\Http\JsonResponse;

class ConfigController extends Controller
{
    /**
     * Return public platform configuration, brand settings, and active feature flags.
     */
    public function brandConfig(): JsonResponse
    {
        $platform = config('platform');

        // Fetch dynamic feature flags from DB
        $dbFlags = FeatureFlag::pluck('is_enabled', 'key')->toArray();
        $mergedFlags = array_merge($platform['featureFlags'] ?? [], $dbFlags);

        return response()->json([
            'success' => true,
            'data' => [
                'name' => SystemSetting::get('platform_name', $platform['name']),
                'shortName' => $platform['shortName'],
                'tagline' => SystemSetting::get('platform_tagline', $platform['tagline']),
                'supportingTagline' => $platform['supportingTagline'],
                'domain' => $platform['domain'],
                'supportEmail' => SystemSetting::get('support_email', $platform['supportEmail']),
                'defaultCurrency' => $platform['defaultCurrency'],
                'defaultLocale' => $platform['defaultLocale'],
                'minWithdrawalCents' => (int) SystemSetting::get('min_withdrawal_cents', $platform['minWithdrawalCents']),
                'platformFeePercent' => (int) SystemSetting::get('platform_fee_percent', $platform['platformFeePercent']),
                'socials' => $platform['socials'],
                'supportedCountries' => $platform['supportedCountries'],
                'featureFlags' => $mergedFlags,
            ],
        ]);
    }

    /**
     * Return active task categories.
     */
    public function categories(): JsonResponse
    {
        $categories = TaskCategory::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }
}
