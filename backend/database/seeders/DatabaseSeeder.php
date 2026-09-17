<?php

namespace Database\Seeders;

use App\Models\AiVerificationResult;
use App\Models\Business;
use App\Models\Campaign;
use App\Models\FeatureFlag;
use App\Models\Profile;
use App\Models\SubmissionFile;
use App\Models\SystemSetting;
use App\Models\Task;
use App\Models\TaskAssignment;
use App\Models\TaskCategory;
use App\Models\TaskSubmission;
use App\Models\User;
use App\Models\Wallet;
use App\Models\WalletTransaction;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Task Categories
        $categories = [
            ['slug' => 'social', 'name' => 'Social Campaigns', 'description' => 'Social media posts, shares, and engagement tasks.', 'icon' => 'Share2', 'sort_order' => 1],
            ['slug' => 'survey', 'name' => 'Surveys', 'description' => 'Targeted consumer opinions and market feedback.', 'icon' => 'ClipboardList', 'sort_order' => 2],
            ['slug' => 'app-testing', 'name' => 'App Testing', 'description' => 'Mobile UX testing and bug discovery.', 'icon' => 'Smartphone', 'sort_order' => 3],
            ['slug' => 'website-testing', 'name' => 'Website Testing', 'description' => 'Usability and navigation testing for web apps.', 'icon' => 'Globe', 'sort_order' => 4],
            ['slug' => 'ugc', 'name' => 'UGC & Video', 'description' => 'Short video testimonials, unboxings, and media clips.', 'icon' => 'Video', 'sort_order' => 5],
            ['slug' => 'content', 'name' => 'Content Creation', 'description' => 'Written reviews, blog highlights, and creative briefs.', 'icon' => 'PenTool', 'sort_order' => 6],
            ['slug' => 'research', 'name' => 'Market Research', 'description' => 'Lead qualification and data collection tasks.', 'icon' => 'Search', 'sort_order' => 7],
            ['slug' => 'feedback', 'name' => 'Product Feedback', 'description' => 'In-depth reviews on digital or physical products.', 'icon' => 'MessageSquare', 'sort_order' => 8],
        ];

        $categoryModels = [];
        foreach ($categories as $cat) {
            $categoryModels[$cat['slug']] = TaskCategory::updateOrCreate(['slug' => $cat['slug']], $cat);
        }

        // 2. Feature Flags
        $flags = [
            ['key' => 'referrals', 'name' => 'Direct Referrals', 'description' => 'Enable single-level referral links and cash bonuses.', 'is_enabled' => true],
            ['key' => 'multiLevelAffiliate', 'name' => 'Multi-Level Affiliate', 'description' => '3-tier affiliate network (requires compliance signoff).', 'is_enabled' => false],
            ['key' => 'aiVerification', 'name' => 'AI Verification Engine', 'description' => 'Pre-screens proof uploads with computer vision heuristics.', 'is_enabled' => true],
            ['key' => 'cryptoPayout', 'name' => 'Crypto Payouts (USDT)', 'description' => 'Permit USDT TRC20/ERC20 cashouts.', 'is_enabled' => false],
            ['key' => 'ugcTasks', 'name' => 'User Generated Content', 'description' => 'Video and high-touch media submissions.', 'is_enabled' => true],
            ['key' => 'retentionMonitoring', 'name' => 'Post Retention Verification', 'description' => 'Checks if social posts remain active after 24-72 hours.', 'is_enabled' => true],
        ];
        foreach ($flags as $f) {
            FeatureFlag::updateOrCreate(['key' => $f['key']], $f);
        }

        // 3. System Settings
        SystemSetting::set('platform_name', 'BizNetwork', 'general', true);
        SystemSetting::set('platform_tagline', 'Small Tasks. Big Opportunities.', 'general', true);
        SystemSetting::set('min_withdrawal_cents', '1000', 'finance', true);
        SystemSetting::set('platform_fee_percent', '15', 'finance', true);
        SystemSetting::set('support_email', 'support@biznetwork.com', 'support', true);

        // 4. Contributor User: Sarah Jenkins
        $sarah = User::updateOrCreate(
            ['email' => 'sarah@biznetwork.com'],
            [
                'name' => 'Sarah Jenkins',
                'password' => Hash::make('password123'),
                'role' => 'contributor',
                'status' => 'active',
                'email_verified_at' => now(),
            ]
        );

        Profile::updateOrCreate(
            ['user_id' => $sarah->id],
            [
                'avatar_url' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
                'country_code' => 'AE',
                'city' => 'Dubai',
                'phone' => '+971501234567',
                'language' => 'en',
                'bio' => 'Digital creator & verified task contributor.',
                'contributor_level' => 'trusted',
                'fraud_score' => 2,
                'completed_tasks_count' => 12,
                'approval_rate' => 98.50,
                'interests_json' => ['social', 'app-testing', 'survey'],
            ]
        );

        // Sarah Wallet: Balance $28.40 (2840 cents), Lifetime $120.00
        $sarahWallet = Wallet::updateOrCreate(
            ['user_id' => $sarah->id],
            [
                'currency' => 'USD',
                'available_balance_cents' => 2840,
                'pending_balance_cents' => 450,
                'lifetime_earnings_cents' => 12000,
                'total_withdrawn_cents' => 9160,
                'is_locked' => false,
            ]
        );

        // Sarah Recent Ledger Transactions
        $transactions = [
            ['type' => 'task_reward', 'amount_cents' => 50, 'balance_after_cents' => 2840, 'description' => 'Task Completed: Post Instagram Story', 'created_at' => now()->subHours(1)],
            ['type' => 'task_reward', 'amount_cents' => 40, 'balance_after_cents' => 2790, 'description' => 'Task Completed: Post in Facebook Group', 'created_at' => now()->subHours(3)],
            ['type' => 'task_reward', 'amount_cents' => 100, 'balance_after_cents' => 2750, 'description' => 'Task Completed: Product Experience Survey', 'created_at' => now()->subDay()],
            ['type' => 'referral_reward', 'amount_cents' => 100, 'balance_after_cents' => 2650, 'description' => 'Referral Bonus: Ayesha K. completed task', 'created_at' => now()->subDays(2)],
            ['type' => 'withdrawal', 'amount_cents' => -2000, 'balance_after_cents' => 2550, 'description' => 'Withdrawal to Bank Account (****4821)', 'created_at' => now()->subDays(5)],
        ];
        foreach ($transactions as $tx) {
            WalletTransaction::firstOrCreate(
                ['wallet_id' => $sarahWallet->id, 'description' => $tx['description']],
                array_merge($tx, ['currency' => 'USD', 'wallet_id' => $sarahWallet->id])
            );
        }

        // 5. Business User & Company: Acme Global
        $businessUser = User::updateOrCreate(
            ['email' => 'brand@acme.com'],
            [
                'name' => 'Alexandre Dubois',
                'password' => Hash::make('password123'),
                'role' => 'business',
                'status' => 'active',
                'email_verified_at' => now(),
            ]
        );

        $acme = Business::updateOrCreate(
            ['owner_id' => $businessUser->id],
            [
                'company_name' => 'Acme Growth Labs',
                'website' => 'https://acme.example.com',
                'industry' => 'Consumer Tech & SaaS',
                'billing_email' => 'billing@acme.example.com',
                'status' => 'active',
                'verified_at' => now(),
            ]
        );

        // 6. Admin & Super Admin Users
        $admin = User::updateOrCreate(
            ['email' => 'admin@biznetwork.com'],
            [
                'name' => 'Platform Moderator',
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'status' => 'active',
                'email_verified_at' => now(),
            ]
        );

        $superAdmin = User::updateOrCreate(
            ['email' => 'superadmin@biznetwork.com'],
            [
                'name' => 'Chief Technology Officer',
                'password' => Hash::make('password123'),
                'role' => 'superadmin',
                'status' => 'active',
                'email_verified_at' => now(),
            ]
        );

        // 7. Realistic Campaigns & Tasks
        $campaignData = [
            [
                'business_id' => $acme->id,
                'category_id' => $categoryModels['social']->id,
                'title' => 'Middle East Tech Launch — Social Awareness',
                'objective' => 'Increase reach and organic community visibility for our SaaS platform launch.',
                'description' => 'Share our verified product introduction post inside active regional Facebook groups and tech communities.',
                'instructions_markdown' => "1. Join or navigate to an approved public tech / business community.\n2. Copy the official launch announcement link.\n3. Publish a genuine introductory post highlighting the free tier.\n4. Take a clear, uncropped screenshot showing timestamp and link.\n5. Submit screenshot and post URL.",
                'total_budget_cents' => 50000, // $500.00
                'remaining_budget_cents' => 38000,
                'reserved_budget_cents' => 4000,
                'reward_per_task_cents' => 40, // $0.40
                'platform_fee_cents' => 6000,
                'target_contributors_count' => 1000,
                'completed_contributors_count' => 245,
                'status' => 'active',
                'tasks' => [
                    [
                        'title' => 'Post in Facebook Group — Real Estate & Tech Dubai',
                        'reward_cents' => 40,
                        'estimated_minutes' => 5,
                        'difficulty' => 'easy',
                        'slots_total' => 500,
                        'slots_taken' => 180,
                    ],
                    [
                        'title' => 'Share on X (Twitter) — Tech Product Launch',
                        'reward_cents' => 30,
                        'estimated_minutes' => 3,
                        'difficulty' => 'easy',
                        'slots_total' => 500,
                        'slots_taken' => 65,
                    ],
                ],
            ],
            [
                'business_id' => $acme->id,
                'category_id' => $categoryModels['survey']->id,
                'title' => 'Global Remote Work & Gig Economy Survey 2026',
                'objective' => 'Collect quantitative consumer insights on freelance task preferences.',
                'description' => 'Fill out our 12-question multiple choice survey regarding mobile gig work habits.',
                'instructions_markdown' => "1. Click open the official survey form link.\n2. Answer all 12 questions thoughtfully and truthfully.\n3. Copy your unique confirmation code on the completion screen.\n4. Submit the confirmation code and survey email address.",
                'total_budget_cents' => 30000, // $300.00
                'remaining_budget_cents' => 21000,
                'reserved_budget_cents' => 3000,
                'reward_per_task_cents' => 100, // $1.00
                'platform_fee_cents' => 4500,
                'target_contributors_count' => 250,
                'completed_contributors_count' => 75,
                'status' => 'active',
                'tasks' => [
                    [
                        'title' => 'Complete Product Survey — Freelance Habits',
                        'reward_cents' => 100,
                        'estimated_minutes' => 5,
                        'difficulty' => 'easy',
                        'slots_total' => 250,
                        'slots_taken' => 75,
                    ],
                ],
            ],
            [
                'business_id' => $acme->id,
                'category_id' => $categoryModels['app-testing']->id,
                'title' => 'iOS & Android Checkout Usability Evaluation',
                'objective' => 'Identify UX friction points during new user onboarding and checkout.',
                'description' => 'Install the test build, create a test account, and attempt the demo checkout with test credentials.',
                'instructions_markdown' => "1. Install the beta test build from TestFlight / Play Store.\n2. Go through onboarding to the payment methods screen.\n3. Note any stutter, layout overflow, or confusion.\n4. Take a screenshot of the order confirmation view and paste notes.",
                'total_budget_cents' => 40000, // $400.00
                'remaining_budget_cents' => 28000,
                'reserved_budget_cents' => 5000,
                'reward_per_task_cents' => 250, // $2.50
                'platform_fee_cents' => 6000,
                'target_contributors_count' => 150,
                'completed_contributors_count' => 42,
                'status' => 'active',
                'tasks' => [
                    [
                        'title' => 'Test a Mobile App Checkout Flow',
                        'reward_cents' => 250,
                        'estimated_minutes' => 10,
                        'difficulty' => 'medium',
                        'slots_total' => 150,
                        'slots_taken' => 42,
                    ],
                ],
            ],
            [
                'business_id' => $acme->id,
                'category_id' => $categoryModels['ugc']->id,
                'title' => 'TikTok & Reels Short UGC Creator Clips',
                'objective' => 'Real creator testimonials showcasing the mobile dashboard experience.',
                'description' => 'Record a short 20-30 second natural video clip discussing how you use the mobile platform.',
                'instructions_markdown' => "1. Record a vertical video in good lighting with clear audio.\n2. Speak naturally about completing small digital tasks from home.\n3. Upload MP4 file or Google Drive/Dropbox unlisted link.",
                'total_budget_cents' => 50000, // $500.00
                'remaining_budget_cents' => 35000,
                'reserved_budget_cents' => 7500,
                'reward_per_task_cents' => 500, // $5.00
                'platform_fee_cents' => 7500,
                'target_contributors_count' => 80,
                'completed_contributors_count' => 22,
                'status' => 'active',
                'tasks' => [
                    [
                        'title' => 'Create Short UGC Clip for TikTok',
                        'reward_cents' => 500,
                        'estimated_minutes' => 15,
                        'difficulty' => 'hard',
                        'slots_total' => 80,
                        'slots_taken' => 22,
                    ],
                ],
            ],
            [
                'business_id' => $acme->id,
                'category_id' => $categoryModels['website-testing']->id,
                'title' => 'Website Experience Test — Navigation & Speed',
                'objective' => 'Test mobile website loading speed across international connections.',
                'description' => 'Visit our landing page on mobile data, browse 3 subpages, and submit browser report.',
                'instructions_markdown' => "1. Visit the target URL on 4G/5G mobile connection.\n2. Browse Home, Pricing, and Documentation.\n3. Take screenshot of the pricing table.\n4. Submit URL and screenshot.",
                'total_budget_cents' => 20000,
                'remaining_budget_cents' => 14000,
                'reserved_budget_cents' => 2000,
                'reward_per_task_cents' => 150, // $1.50
                'platform_fee_cents' => 3000,
                'target_contributors_count' => 100,
                'completed_contributors_count' => 36,
                'status' => 'active',
                'tasks' => [
                    [
                        'title' => 'Website Experience Test',
                        'reward_cents' => 150,
                        'estimated_minutes' => 7,
                        'difficulty' => 'easy',
                        'slots_total' => 100,
                        'slots_taken' => 36,
                    ],
                ],
            ],
        ];

        $createdTasks = [];
        foreach ($campaignData as $campInfo) {
            $taskDefs = $campInfo['tasks'];
            unset($campInfo['tasks']);

            $campaign = Campaign::updateOrCreate(
                ['title' => $campInfo['title'], 'business_id' => $campInfo['business_id']],
                $campInfo
            );

            foreach ($taskDefs as $tDef) {
                $createdTasks[] = Task::updateOrCreate(
                    ['campaign_id' => $campaign->id, 'title' => $tDef['title']],
                    array_merge($tDef, ['category_id' => $campaign->category_id])
                );
            }
        }

        // 8. Create Live Submissions in Verification Queue (for Admin Demo)
        if (!empty($createdTasks)) {
            $sampleTask = $createdTasks[0]; // FB post task ($0.40)

            $assignment = TaskAssignment::create([
                'task_id' => $sampleTask->id,
                'user_id' => $sarah->id,
                'status' => 'submitted',
                'started_at' => now()->subMinutes(25),
                'completed_at' => now()->subMinutes(5),
            ]);

            $submission = TaskSubmission::create([
                'task_id' => $sampleTask->id,
                'user_id' => $sarah->id,
                'assignment_id' => $assignment->id,
                'status' => 'under_review',
                'proof_data_json' => [
                    'url' => 'https://facebook.com/groups/uaetechentrepreneurs/permalink/982341908234/',
                    'note' => 'Posted in UAE Tech Entrepreneurs (45k members). Followed all hashtag rules.',
                    'device' => 'iPhone 15 Pro, iOS 18',
                    'location' => 'Dubai, UAE',
                ],
            ]);

            SubmissionFile::create([
                'submission_id' => $submission->id,
                'file_type' => 'screenshot',
                'file_path' => 'proofs/fb_post_screenshot_demo.png',
                'file_url' => 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800',
                'file_size_bytes' => 1048576,
                'mime_type' => 'image/png',
            ]);

            AiVerificationResult::create([
                'submission_id' => $submission->id,
                'confidence_score' => 93,
                'risk_score' => 7,
                'duplicate_risk' => 4,
                'proof_quality' => 95,
                'content_match' => 96,
                'policy_match' => 99,
                'suggested_decision' => 'approve',
                'analysis_summary' => 'Proof screenshot matches required Facebook group post timestamp, resolution 1170x2532, visual text matches campaign guidelines (authenticity index 94.2%). No duplicate image hash found.',
                'raw_payload_json' => [
                    'provider' => 'biznetwork_vision_ai_v2',
                    'tags' => ['facebook', 'clean_post', 'verified_link'],
                ],
            ]);
        }
    }
}
