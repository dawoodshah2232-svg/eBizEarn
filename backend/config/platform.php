<?php

return [
    'name' => env('PLATFORM_NAME', 'BizNetwork'),
    'shortName' => env('PLATFORM_SHORT_NAME', 'BizNetwork'),
    'tagline' => 'Small Tasks. Big Opportunities.',
    'supportingTagline' => 'Complete verified digital tasks from real businesses, submit your work and receive rewards securely.',
    'domain' => env('PLATFORM_DOMAIN', 'biznetwork.com'),
    'appUrl' => env('PLATFORM_APP_URL', 'https://app.biznetwork.com'),
    'businessUrl' => env('PLATFORM_BUSINESS_URL', 'https://business.biznetwork.com'),
    'adminUrl' => env('PLATFORM_ADMIN_URL', 'https://admin.biznetwork.com'),
    'supportEmail' => env('PLATFORM_SUPPORT_EMAIL', 'support@biznetwork.com'),
    'defaultCurrency' => 'USD',
    'defaultLocale' => 'en',
    'minWithdrawalCents' => 1000, // $10.00
    'platformFeePercent' => 15, // 15% platform margin on campaigns
    'socials' => [
        'facebook' => 'https://facebook.com/biznetwork',
        'instagram' => 'https://instagram.com/biznetwork',
        'linkedin' => 'https://linkedin.com/company/biznetwork',
        'x' => 'https://x.com/biznetwork',
        'youtube' => 'https://youtube.com/@biznetwork',
    ],
    'supportedCountries' => [
        'AE' => ['name' => 'United Arab Emirates', 'currency' => 'AED', 'active' => true],
        'US' => ['name' => 'United States', 'currency' => 'USD', 'active' => true],
        'GB' => ['name' => 'United Kingdom', 'currency' => 'GBP', 'active' => true],
        'IN' => ['name' => 'India', 'currency' => 'INR', 'active' => true],
        'PK' => ['name' => 'Pakistan', 'currency' => 'PKR', 'active' => true],
        'BD' => ['name' => 'Bangladesh', 'currency' => 'BDT', 'active' => true],
        'LK' => ['name' => 'Sri Lanka', 'currency' => 'LKR', 'active' => true],
        'PH' => ['name' => 'Philippines', 'currency' => 'PHP', 'active' => true],
        'NG' => ['name' => 'Nigeria', 'currency' => 'NGN', 'active' => true],
        'BR' => ['name' => 'Brazil', 'currency' => 'BRL', 'active' => true],
    ],
    'featureFlags' => [
        'referrals' => true,
        'multiLevelAffiliate' => false, // disabled by default per policy
        'cryptoPayout' => false,
        'ugcTasks' => true,
        'socialTasks' => true,
        'aiVerification' => true,
        'retentionMonitoring' => true,
        'businessSelfServe' => true,
        'multiLanguage' => true,
        'advancedAnalytics' => true,
    ],
];
