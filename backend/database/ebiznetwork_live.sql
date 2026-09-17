-- =========================================================================
-- EBIZ NETWORK / BIZNETWORK PRODUCTION DATABASE DUMP
-- Target RDBMS: MySQL 8.x / 5.7+ & MariaDB 10.x (GoDaddy cPanel / phpMyAdmin)
-- Generated: 2026-09-17 22:55:33 UTC
-- =========================================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";
SET NAMES utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `users`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(36) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `email_verified_at` TIMESTAMP NULL DEFAULT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('contributor','business','admin','superadmin') NOT NULL DEFAULT 'contributor',
  `status` ENUM('active','pending','suspended','banned') NOT NULL DEFAULT 'active',
  `referral_code` VARCHAR(50) NULL DEFAULT NULL,
  `referrer_id` BIGINT UNSIGNED NULL DEFAULT NULL,
  `remember_token` VARCHAR(100) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `deleted_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_email_index` (`email`),
  KEY `users_role_index` (`role`),
  KEY `users_status_index` (`status`),
  KEY `users_referral_code_index` (`referral_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `users`
INSERT INTO `users` (`id`, `uuid`, `name`, `email`, `email_verified_at`, `password`, `role`, `status`, `referral_code`, `referrer_id`, `remember_token`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '89fbc619-0f16-4d2f-b342-a69295fdd552', 'Sarah Jenkins', 'sarah@biznetwork.com', '2026-09-17 22:54:18', '$2y$12$1XaAo9Fija7qJ8jOoHdB7OMxXx3PJb3tpCaCvaCQDHXuI8OW/r/RK', 'contributor', 'active', 'MZEBFCAC', NULL, NULL, '2026-09-17 22:54:18', '2026-09-17 22:54:18', NULL),
(2, '9178dab4-04d9-4c63-a625-66922db0238b', 'Alexandre Dubois', 'brand@acme.com', '2026-09-17 22:54:18', '$2y$12$FtuaXaR/yHGPKr/.O69QvO6IXsAJi8hjfm9C6EZY29nTSAzyzjRG6', 'business', 'active', 'HZMHNFUC', NULL, NULL, '2026-09-17 22:54:18', '2026-09-17 22:54:18', NULL),
(3, '60d551bc-f7a7-4604-85c5-5d778e1b41fe', 'Platform Moderator', 'admin@biznetwork.com', '2026-09-17 22:54:19', '$2y$12$00iO.vFGgWPbgz2ky6bDMOJiPfCxxqC9DCJJhRTJ.Xy9RDVakOFVa', 'admin', 'active', 'GDWHVTB0', NULL, NULL, '2026-09-17 22:54:19', '2026-09-17 22:54:19', NULL),
(4, '4bdf0fdb-398e-4ab2-8db4-9508e4216d83', 'Chief Technology Officer', 'superadmin@biznetwork.com', '2026-09-17 22:54:19', '$2y$12$AucHRPYgrQcjgZNuSXSs0utlHtJDA/14iWyjYx0mE.Wg7RmzHaS0u', 'superadmin', 'active', 'SGNODWX5', NULL, NULL, '2026-09-17 22:54:19', '2026-09-17 22:54:19', NULL);

-- --------------------------------------------------------
-- Table structure for table `password_reset_tokens`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` VARCHAR(255) NOT NULL,
  `token` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `sessions`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` VARCHAR(255) NOT NULL,
  `user_id` BIGINT UNSIGNED NULL DEFAULT NULL,
  `ip_address` VARCHAR(45) NULL DEFAULT NULL,
  `user_agent` TEXT NULL DEFAULT NULL,
  `payload` LONGTEXT NOT NULL,
  `last_activity` INT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `cache`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `cache`;
CREATE TABLE IF NOT EXISTS `cache` (
  `key` VARCHAR(255) NOT NULL,
  `value` MEDIUMTEXT NOT NULL,
  `expiration` INT NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `cache_locks`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` VARCHAR(255) NOT NULL,
  `owner` VARCHAR(255) NOT NULL,
  `expiration` INT NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `jobs`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `queue` VARCHAR(255) NOT NULL,
  `payload` LONGTEXT NOT NULL,
  `attempts` TINYINT UNSIGNED NOT NULL,
  `reserved_at` INT UNSIGNED NULL DEFAULT NULL,
  `available_at` INT UNSIGNED NOT NULL,
  `created_at` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `job_batches`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `total_jobs` INT NOT NULL,
  `pending_jobs` INT NOT NULL,
  `failed_jobs` INT NOT NULL,
  `failed_job_ids` LONGTEXT NOT NULL,
  `options` MEDIUMTEXT NULL,
  `cancelled_at` INT NULL DEFAULT NULL,
  `created_at` INT NOT NULL,
  `finished_at` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `failed_jobs`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(255) NOT NULL UNIQUE,
  `connection` TEXT NOT NULL,
  `queue` TEXT NOT NULL,
  `payload` LONGTEXT NOT NULL,
  `exception` LONGTEXT NOT NULL,
  `failed_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `profiles`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `profiles`;
CREATE TABLE IF NOT EXISTS `profiles` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `avatar_url` VARCHAR(500) NULL DEFAULT NULL,
  `country_code` VARCHAR(10) NULL DEFAULT NULL,
  `city` VARCHAR(100) NULL DEFAULT NULL,
  `phone` VARCHAR(50) NULL DEFAULT NULL,
  `language` VARCHAR(20) NOT NULL DEFAULT 'en',
  `bio` TEXT NULL DEFAULT NULL,
  `contributor_level` VARCHAR(50) NOT NULL DEFAULT 'starter',
  `fraud_score` INT NOT NULL DEFAULT 0,
  `completed_tasks_count` INT NOT NULL DEFAULT 0,
  `approval_rate` DECIMAL(5,2) NOT NULL DEFAULT 100.00,
  `interests_json` JSON NULL DEFAULT NULL,
  `kyc_status` ENUM('unverified','pending','verified','rejected') NOT NULL DEFAULT 'unverified',
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `profiles_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `profiles`
INSERT INTO `profiles` (`id`, `user_id`, `avatar_url`, `phone`, `country_code`, `city`, `language`, `bio`, `contributor_level`, `fraud_score`, `completed_tasks_count`, `approval_rate`, `interests_json`, `preferences_json`, `created_at`, `updated_at`) VALUES
(1, 1, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', '+971501234567', 'AE', 'Dubai', 'en', 'Digital creator & verified task contributor.', 'trusted', 2, 12, 98.5, '[\"social\",\"app-testing\",\"survey\"]', NULL, '2026-09-17 22:54:18', '2026-09-17 22:54:18');

-- --------------------------------------------------------
-- Table structure for table `businesses`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `businesses`;
CREATE TABLE IF NOT EXISTS `businesses` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `owner_id` BIGINT UNSIGNED NOT NULL,
  `company_name` VARCHAR(255) NOT NULL,
  `website` VARCHAR(500) NULL DEFAULT NULL,
  `industry` VARCHAR(100) NULL DEFAULT NULL,
  `billing_email` VARCHAR(255) NULL DEFAULT NULL,
  `status` ENUM('active','pending','suspended') NOT NULL DEFAULT 'active',
  `verified_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `businesses_owner_id_index` (`owner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `businesses`
INSERT INTO `businesses` (`id`, `uuid`, `owner_id`, `company_name`, `website`, `industry`, `billing_email`, `status`, `verified_at`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '19ddd538-6fd9-46ac-bb7a-3c3552c7e43b', 2, 'Acme Growth Labs', 'https://acme.example.com', 'Consumer Tech & SaaS', 'billing@acme.example.com', 'active', '2026-09-17 22:54:18', '2026-09-17 22:54:18', '2026-09-17 22:54:18', NULL);

-- --------------------------------------------------------
-- Table structure for table `task_categories`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `task_categories`;
CREATE TABLE IF NOT EXISTS `task_categories` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `icon` VARCHAR(100) NULL DEFAULT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `task_categories`
INSERT INTO `task_categories` (`id`, `slug`, `name`, `description`, `icon`, `is_active`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'social', 'Social Campaigns', 'Social media posts, shares, and engagement tasks.', 'Share2', 1, 1, '2026-09-17 22:54:18', '2026-09-17 22:54:18'),
(2, 'survey', 'Surveys', 'Targeted consumer opinions and market feedback.', 'ClipboardList', 1, 2, '2026-09-17 22:54:18', '2026-09-17 22:54:18'),
(3, 'app-testing', 'App Testing', 'Mobile UX testing and bug discovery.', 'Smartphone', 1, 3, '2026-09-17 22:54:18', '2026-09-17 22:54:18'),
(4, 'website-testing', 'Website Testing', 'Usability and navigation testing for web apps.', 'Globe', 1, 4, '2026-09-17 22:54:18', '2026-09-17 22:54:18'),
(5, 'ugc', 'UGC & Video', 'Short video testimonials, unboxings, and media clips.', 'Video', 1, 5, '2026-09-17 22:54:18', '2026-09-17 22:54:18'),
(6, 'content', 'Content Creation', 'Written reviews, blog highlights, and creative briefs.', 'PenTool', 1, 6, '2026-09-17 22:54:18', '2026-09-17 22:54:18'),
(7, 'research', 'Market Research', 'Lead qualification and data collection tasks.', 'Search', 1, 7, '2026-09-17 22:54:18', '2026-09-17 22:54:18'),
(8, 'feedback', 'Product Feedback', 'In-depth reviews on digital or physical products.', 'MessageSquare', 1, 8, '2026-09-17 22:54:18', '2026-09-17 22:54:18');

-- --------------------------------------------------------
-- Table structure for table `campaigns`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `campaigns`;
CREATE TABLE IF NOT EXISTS `campaigns` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(36) NOT NULL,
  `business_id` BIGINT UNSIGNED NOT NULL,
  `category_id` BIGINT UNSIGNED NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `objective` VARCHAR(255) NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `instructions_markdown` LONGTEXT NULL DEFAULT NULL,
  `total_budget_cents` BIGINT NOT NULL,
  `remaining_budget_cents` BIGINT NOT NULL,
  `reserved_budget_cents` BIGINT NOT NULL DEFAULT 0,
  `reward_per_task_cents` BIGINT NOT NULL,
  `platform_fee_cents` BIGINT NOT NULL DEFAULT 0,
  `target_contributors_count` INT NOT NULL,
  `completed_contributors_count` INT NOT NULL DEFAULT 0,
  `target_countries_json` JSON NULL DEFAULT NULL,
  `min_contributor_level` VARCHAR(50) NOT NULL DEFAULT 'starter',
  `status` ENUM('draft','active','paused','completed','cancelled') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `campaigns_business_id_index` (`business_id`),
  KEY `campaigns_category_id_index` (`category_id`),
  KEY `campaigns_status_index` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `campaigns`
INSERT INTO `campaigns` (`id`, `uuid`, `business_id`, `category_id`, `title`, `objective`, `description`, `instructions_markdown`, `proof_requirements_json`, `status`, `total_budget_cents`, `remaining_budget_cents`, `reserved_budget_cents`, `reward_per_task_cents`, `platform_fee_cents`, `target_contributors_count`, `completed_contributors_count`, `target_countries_json`, `target_languages_json`, `min_contributor_level`, `retention_hours`, `starts_at`, `ends_at`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'cf50eb2c-e297-4c4b-b30f-2447c3d99e9a', 1, 1, 'Middle East Tech Launch — Social Awareness', 'Increase reach and organic community visibility for our SaaS platform launch.', 'Share our verified product introduction post inside active regional Facebook groups and tech communities.', '1. Join or navigate to an approved public tech / business community.\n2. Copy the official launch announcement link.\n3. Publish a genuine introductory post highlighting the free tier.\n4. Take a clear, uncropped screenshot showing timestamp and link.\n5. Submit screenshot and post URL.', NULL, 'active', 50000, 38000, 4000, 40, 6000, 1000, 245, NULL, NULL, 'starter', 24, NULL, NULL, '2026-09-17 22:54:19', '2026-09-17 22:54:19', NULL),
(2, '2453165f-da4a-4e54-ab19-250e2e434bfe', 1, 2, 'Global Remote Work & Gig Economy Survey 2026', 'Collect quantitative consumer insights on freelance task preferences.', 'Fill out our 12-question multiple choice survey regarding mobile gig work habits.', '1. Click open the official survey form link.\n2. Answer all 12 questions thoughtfully and truthfully.\n3. Copy your unique confirmation code on the completion screen.\n4. Submit the confirmation code and survey email address.', NULL, 'active', 30000, 21000, 3000, 100, 4500, 250, 75, NULL, NULL, 'starter', 24, NULL, NULL, '2026-09-17 22:54:19', '2026-09-17 22:54:19', NULL),
(3, '94de1f22-5a64-491d-b36d-5d2911812632', 1, 3, 'iOS & Android Checkout Usability Evaluation', 'Identify UX friction points during new user onboarding and checkout.', 'Install the test build, create a test account, and attempt the demo checkout with test credentials.', '1. Install the beta test build from TestFlight / Play Store.\n2. Go through onboarding to the payment methods screen.\n3. Note any stutter, layout overflow, or confusion.\n4. Take a screenshot of the order confirmation view and paste notes.', NULL, 'active', 40000, 28000, 5000, 250, 6000, 150, 42, NULL, NULL, 'starter', 24, NULL, NULL, '2026-09-17 22:54:19', '2026-09-17 22:54:19', NULL),
(4, '6100f13c-3ed5-4486-a96d-99a573403999', 1, 5, 'TikTok & Reels Short UGC Creator Clips', 'Real creator testimonials showcasing the mobile dashboard experience.', 'Record a short 20-30 second natural video clip discussing how you use the mobile platform.', '1. Record a vertical video in good lighting with clear audio.\n2. Speak naturally about completing small digital tasks from home.\n3. Upload MP4 file or Google Drive/Dropbox unlisted link.', NULL, 'active', 50000, 35000, 7500, 500, 7500, 80, 22, NULL, NULL, 'starter', 24, NULL, NULL, '2026-09-17 22:54:19', '2026-09-17 22:54:19', NULL),
(5, 'ea2f1fc7-b74f-49c1-a5b9-5f218c461302', 1, 4, 'Website Experience Test — Navigation & Speed', 'Test mobile website loading speed across international connections.', 'Visit our landing page on mobile data, browse 3 subpages, and submit browser report.', '1. Visit the target URL on 4G/5G mobile connection.\n2. Browse Home, Pricing, and Documentation.\n3. Take screenshot of the pricing table.\n4. Submit URL and screenshot.', NULL, 'active', 20000, 14000, 2000, 150, 3000, 100, 36, NULL, NULL, 'starter', 24, NULL, NULL, '2026-09-17 22:54:19', '2026-09-17 22:54:19', NULL);

-- --------------------------------------------------------
-- Table structure for table `tasks`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `tasks`;
CREATE TABLE IF NOT EXISTS `tasks` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(36) NOT NULL,
  `campaign_id` BIGINT UNSIGNED NOT NULL,
  `category_id` BIGINT UNSIGNED NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `reward_cents` BIGINT NOT NULL,
  `estimated_minutes` INT NOT NULL DEFAULT 5,
  `difficulty` ENUM('easy','medium','hard') NOT NULL DEFAULT 'easy',
  `slots_total` INT NOT NULL,
  `slots_taken` INT NOT NULL DEFAULT 0,
  `status` ENUM('available','paused','filled','archived') NOT NULL DEFAULT 'available',
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tasks_campaign_id_index` (`campaign_id`),
  KEY `tasks_category_id_index` (`category_id`),
  KEY `tasks_status_index` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `tasks`
INSERT INTO `tasks` (`id`, `uuid`, `campaign_id`, `category_id`, `title`, `reward_cents`, `estimated_minutes`, `difficulty`, `status`, `slots_total`, `slots_taken`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '30bfb8da-15b3-440d-920a-ef7c9073c0d2', 1, 1, 'Post in Facebook Group — Real Estate & Tech Dubai', 40, 5, 'easy', 'available', 500, 180, '2026-09-17 22:54:19', '2026-09-17 22:54:19', NULL),
(2, 'f21d3436-7084-45e5-b2b0-90a108d121ee', 1, 1, 'Share on X (Twitter) — Tech Product Launch', 30, 3, 'easy', 'available', 500, 65, '2026-09-17 22:54:19', '2026-09-17 22:54:19', NULL),
(3, 'bde8a50e-1376-48dc-949a-feec030adbe9', 2, 2, 'Complete Product Survey — Freelance Habits', 100, 5, 'easy', 'available', 250, 75, '2026-09-17 22:54:19', '2026-09-17 22:54:19', NULL),
(4, 'adedb8a9-ceb4-4a15-a327-ff9a35811d23', 3, 3, 'Test a Mobile App Checkout Flow', 250, 10, 'medium', 'available', 150, 42, '2026-09-17 22:54:19', '2026-09-17 22:54:19', NULL),
(5, '268513a5-22dd-4a5f-8cfc-60289088b035', 4, 5, 'Create Short UGC Clip for TikTok', 500, 15, 'hard', 'available', 80, 22, '2026-09-17 22:54:19', '2026-09-17 22:54:19', NULL),
(6, '3770b3b9-4edc-4aec-9ddb-98381dcf488f', 5, 4, 'Website Experience Test', 150, 7, 'easy', 'available', 100, 36, '2026-09-17 22:54:19', '2026-09-17 22:54:19', NULL);

-- --------------------------------------------------------
-- Table structure for table `task_assignments`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `task_assignments`;
CREATE TABLE IF NOT EXISTS `task_assignments` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `task_id` BIGINT UNSIGNED NOT NULL,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `status` ENUM('assigned','in_progress','submitted','completed','expired','abandoned') NOT NULL DEFAULT 'assigned',
  `expires_at` TIMESTAMP NULL DEFAULT NULL,
  `completed_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `task_assignments_task_id_index` (`task_id`),
  KEY `task_assignments_user_id_index` (`user_id`),
  KEY `task_assignments_status_index` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `task_assignments`
INSERT INTO `task_assignments` (`id`, `task_id`, `user_id`, `status`, `reserved_until`, `started_at`, `completed_at`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'submitted', NULL, '2026-09-17 22:29:19', '2026-09-17 22:49:19', '2026-09-17 22:54:19', '2026-09-17 22:54:19');

-- --------------------------------------------------------
-- Table structure for table `task_submissions`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `task_submissions`;
CREATE TABLE IF NOT EXISTS `task_submissions` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(36) NOT NULL,
  `task_id` BIGINT UNSIGNED NOT NULL,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `assignment_id` BIGINT UNSIGNED NULL DEFAULT NULL,
  `status` ENUM('submitted','under_review','approved','rejected','action_required') NOT NULL DEFAULT 'submitted',
  `proof_data_json` LONGTEXT NOT NULL,
  `reviewer_id` BIGINT UNSIGNED NULL DEFAULT NULL,
  `reviewed_at` TIMESTAMP NULL DEFAULT NULL,
  `review_notes` TEXT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `task_submissions_task_id_index` (`task_id`),
  KEY `task_submissions_user_id_index` (`user_id`),
  KEY `task_submissions_status_index` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `task_submissions`
INSERT INTO `task_submissions` (`id`, `uuid`, `task_id`, `user_id`, `assignment_id`, `status`, `proof_data_json`, `reviewer_id`, `reviewed_at`, `review_notes`, `created_at`, `updated_at`) VALUES
(1, '7e9c6988-be75-413c-a3fe-64ef54410656', 1, 1, 1, 'under_review', '{\"url\":\"https:\\/\\/facebook.com\\/groups\\/uaetechentrepreneurs\\/permalink\\/982341908234\\/\",\"note\":\"Posted in UAE Tech Entrepreneurs (45k members). Followed all hashtag rules.\",\"device\":\"iPhone 15 Pro, iOS 18\",\"location\":\"Dubai, UAE\"}', NULL, NULL, NULL, '2026-09-17 22:54:19', '2026-09-17 22:54:19');

-- --------------------------------------------------------
-- Table structure for table `submission_files`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `submission_files`;
CREATE TABLE IF NOT EXISTS `submission_files` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `submission_id` BIGINT UNSIGNED NOT NULL,
  `file_type` ENUM('screenshot','video','url','document') NOT NULL DEFAULT 'screenshot',
  `file_path` VARCHAR(500) NOT NULL,
  `file_url` VARCHAR(500) NOT NULL,
  `file_size_bytes` BIGINT NULL DEFAULT NULL,
  `mime_type` VARCHAR(100) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `submission_files_submission_id_index` (`submission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `submission_files`
INSERT INTO `submission_files` (`id`, `submission_id`, `file_type`, `file_path`, `file_url`, `file_size_bytes`, `mime_type`, `created_at`, `updated_at`) VALUES
(1, 1, 'screenshot', 'proofs/fb_post_screenshot_demo.png', 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800', 1048576, 'image/png', '2026-09-17 22:54:19', '2026-09-17 22:54:19');

-- --------------------------------------------------------
-- Table structure for table `ai_verification_results`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `ai_verification_results`;
CREATE TABLE IF NOT EXISTS `ai_verification_results` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `submission_id` BIGINT UNSIGNED NOT NULL,
  `confidence_score` INT NOT NULL DEFAULT 0,
  `risk_score` INT NOT NULL DEFAULT 0,
  `duplicate_risk` INT NOT NULL DEFAULT 0,
  `proof_quality` INT NOT NULL DEFAULT 0,
  `content_match` INT NOT NULL DEFAULT 0,
  `policy_match` INT NOT NULL DEFAULT 0,
  `suggested_decision` ENUM('approve','reject','flag') NOT NULL DEFAULT 'approve',
  `analysis_summary` TEXT NOT NULL,
  `raw_payload_json` LONGTEXT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ai_verification_results_submission_id_index` (`submission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `ai_verification_results`
INSERT INTO `ai_verification_results` (`id`, `submission_id`, `confidence_score`, `risk_score`, `duplicate_risk`, `proof_quality`, `content_match`, `policy_match`, `suggested_decision`, `analysis_summary`, `raw_payload_json`, `created_at`, `updated_at`) VALUES
(1, 1, 93, 7, 4, 95, 96, 99, 'approve', 'Proof screenshot matches required Facebook group post timestamp, resolution 1170x2532, visual text matches campaign guidelines (authenticity index 94.2%). No duplicate image hash found.', '{\"provider\":\"biznetwork_vision_ai_v2\",\"tags\":[\"facebook\",\"clean_post\",\"verified_link\"]}', '2026-09-17 22:54:19', '2026-09-17 22:54:19');

-- --------------------------------------------------------
-- Table structure for table `wallets`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `wallets`;
CREATE TABLE IF NOT EXISTS `wallets` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `currency` VARCHAR(10) NOT NULL DEFAULT 'USD',
  `available_balance_cents` BIGINT NOT NULL DEFAULT 0,
  `pending_balance_cents` BIGINT NOT NULL DEFAULT 0,
  `lifetime_earnings_cents` BIGINT NOT NULL DEFAULT 0,
  `total_withdrawn_cents` BIGINT NOT NULL DEFAULT 0,
  `is_locked` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `wallets_user_id_currency_unique` (`user_id`, `currency`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `wallets`
INSERT INTO `wallets` (`id`, `user_id`, `currency`, `available_balance_cents`, `pending_balance_cents`, `lifetime_earnings_cents`, `total_withdrawn_cents`, `is_locked`, `created_at`, `updated_at`) VALUES
(1, 1, 'USD', 2840, 450, 12000, 9160, '0', '2026-09-17 22:54:18', '2026-09-17 22:54:18');

-- --------------------------------------------------------
-- Table structure for table `wallet_transactions`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `wallet_transactions`;
CREATE TABLE IF NOT EXISTS `wallet_transactions` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `wallet_id` BIGINT UNSIGNED NOT NULL,
  `type` ENUM('task_reward','referral_reward','withdrawal','withdrawal_reversal','campaign_funding','campaign_refund','admin_adjustment','bonus') NOT NULL,
  `amount_cents` BIGINT NOT NULL,
  `balance_after_cents` BIGINT NOT NULL,
  `currency` VARCHAR(10) NOT NULL DEFAULT 'USD',
  `reference_type` VARCHAR(100) NULL DEFAULT NULL,
  `reference_id` BIGINT UNSIGNED NULL DEFAULT NULL,
  `description` VARCHAR(500) NOT NULL,
  `metadata_json` LONGTEXT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `wallet_transactions_wallet_id_index` (`wallet_id`),
  KEY `wallet_transactions_type_index` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `wallet_transactions`
INSERT INTO `wallet_transactions` (`id`, `wallet_id`, `type`, `amount_cents`, `balance_after_cents`, `currency`, `reference_type`, `reference_id`, `description`, `metadata_json`, `created_at`) VALUES
(1, 1, 'task_reward', 50, 2840, 'USD', NULL, NULL, 'Task Completed: Post Instagram Story', NULL, '2026-09-17 21:54:18'),
(2, 1, 'task_reward', 40, 2790, 'USD', NULL, NULL, 'Task Completed: Post in Facebook Group', NULL, '2026-09-17 19:54:18'),
(3, 1, 'task_reward', 100, 2750, 'USD', NULL, NULL, 'Task Completed: Product Experience Survey', NULL, '2026-09-16 22:54:18'),
(4, 1, 'referral_reward', 100, 2650, 'USD', NULL, NULL, 'Referral Bonus: Ayesha K. completed task', NULL, '2026-09-15 22:54:18'),
(5, 1, 'withdrawal', -2000, 2550, 'USD', NULL, NULL, 'Withdrawal to Bank Account (****4821)', NULL, '2026-09-12 22:54:18');

-- --------------------------------------------------------
-- Table structure for table `withdrawal_requests`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `withdrawal_requests`;
CREATE TABLE IF NOT EXISTS `withdrawal_requests` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(36) NOT NULL,
  `wallet_id` BIGINT UNSIGNED NOT NULL,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `amount_cents` BIGINT NOT NULL,
  `fee_cents` BIGINT NOT NULL DEFAULT 0,
  `currency` VARCHAR(10) NOT NULL DEFAULT 'USD',
  `payout_method` VARCHAR(50) NOT NULL,
  `payout_details_json` LONGTEXT NOT NULL,
  `status` ENUM('requested','compliance_check','processing','paid','failed','rejected','cancelled') NOT NULL DEFAULT 'requested',
  `processed_at` TIMESTAMP NULL DEFAULT NULL,
  `provider_transaction_id` VARCHAR(255) NULL DEFAULT NULL,
  `admin_notes` TEXT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `withdrawal_requests_wallet_id_index` (`wallet_id`),
  KEY `withdrawal_requests_user_id_index` (`user_id`),
  KEY `withdrawal_requests_status_index` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `referrals`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `referrals`;
CREATE TABLE IF NOT EXISTS `referrals` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `referrer_id` BIGINT UNSIGNED NOT NULL,
  `referred_user_id` BIGINT UNSIGNED NOT NULL,
  `status` ENUM('pending','qualified','rewarded') NOT NULL DEFAULT 'pending',
  `qualified_at` TIMESTAMP NULL DEFAULT NULL,
  `reward_cents` BIGINT NOT NULL DEFAULT 100,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `referrals_referrer_id_index` (`referrer_id`),
  KEY `referrals_referred_user_id_index` (`referred_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `fraud_events`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `fraud_events`;
CREATE TABLE IF NOT EXISTS `fraud_events` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT UNSIGNED NULL DEFAULT NULL,
  `submission_id` BIGINT UNSIGNED NULL DEFAULT NULL,
  `event_type` VARCHAR(100) NOT NULL,
  `severity` ENUM('low','medium','high','critical') NOT NULL DEFAULT 'low',
  `details_json` LONGTEXT NULL DEFAULT NULL,
  `ip_address` VARCHAR(45) NULL DEFAULT NULL,
  `user_agent` TEXT NULL DEFAULT NULL,
  `status` ENUM('flagged','reviewed','dismissed','confirmed_fraud') NOT NULL DEFAULT 'flagged',
  `resolved_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fraud_events_user_id_index` (`user_id`),
  KEY `fraud_events_severity_index` (`severity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `feature_flags`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `feature_flags`;
CREATE TABLE IF NOT EXISTS `feature_flags` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `key` VARCHAR(100) NOT NULL UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `is_enabled` TINYINT(1) NOT NULL DEFAULT 0,
  `rules_json` LONGTEXT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `feature_flags`
INSERT INTO `feature_flags` (`id`, `key`, `name`, `description`, `is_enabled`, `rules_json`, `created_at`, `updated_at`) VALUES
(1, 'referrals', 'Direct Referrals', 'Enable single-level referral links and cash bonuses.', 1, NULL, '2026-09-17 22:54:18', '2026-09-17 22:54:18'),
(2, 'multiLevelAffiliate', 'Multi-Level Affiliate', '3-tier affiliate network (requires compliance signoff).', '0', NULL, '2026-09-17 22:54:18', '2026-09-17 22:54:18'),
(3, 'aiVerification', 'AI Verification Engine', 'Pre-screens proof uploads with computer vision heuristics.', 1, NULL, '2026-09-17 22:54:18', '2026-09-17 22:54:18'),
(4, 'cryptoPayout', 'Crypto Payouts (USDT)', 'Permit USDT TRC20/ERC20 cashouts.', '0', NULL, '2026-09-17 22:54:18', '2026-09-17 22:54:18'),
(5, 'ugcTasks', 'User Generated Content', 'Video and high-touch media submissions.', 1, NULL, '2026-09-17 22:54:18', '2026-09-17 22:54:18'),
(6, 'retentionMonitoring', 'Post Retention Verification', 'Checks if social posts remain active after 24-72 hours.', 1, NULL, '2026-09-17 22:54:18', '2026-09-17 22:54:18');

-- --------------------------------------------------------
-- Table structure for table `audit_logs`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `audit_logs`;
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `actor_id` BIGINT UNSIGNED NULL DEFAULT NULL,
  `action` VARCHAR(100) NOT NULL,
  `entity_type` VARCHAR(100) NOT NULL,
  `entity_id` BIGINT UNSIGNED NOT NULL,
  `before_state_json` LONGTEXT NULL DEFAULT NULL,
  `after_state_json` LONGTEXT NULL DEFAULT NULL,
  `ip_address` VARCHAR(45) NULL DEFAULT NULL,
  `user_agent` TEXT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `audit_logs_actor_id_index` (`actor_id`),
  KEY `audit_logs_action_index` (`action`),
  KEY `audit_logs_entity_index` (`entity_type`, `entity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `support_tickets`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `support_tickets`;
CREATE TABLE IF NOT EXISTS `support_tickets` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(36) NOT NULL,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL DEFAULT 'general',
  `priority` ENUM('low','normal','high','urgent') NOT NULL DEFAULT 'normal',
  `status` ENUM('open','in_progress','resolved','closed') NOT NULL DEFAULT 'open',
  `assigned_agent_id` BIGINT UNSIGNED NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `support_tickets_user_id_index` (`user_id`),
  KEY `support_tickets_status_index` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `support_messages`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `support_messages`;
CREATE TABLE IF NOT EXISTS `support_messages` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `ticket_id` BIGINT UNSIGNED NOT NULL,
  `sender_id` BIGINT UNSIGNED NOT NULL,
  `message` LONGTEXT NOT NULL,
  `attachments_json` LONGTEXT NULL DEFAULT NULL,
  `is_internal_note` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `support_messages_ticket_id_index` (`ticket_id`),
  KEY `support_messages_sender_id_index` (`sender_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `system_settings`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `system_settings`;
CREATE TABLE IF NOT EXISTS `system_settings` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `key` VARCHAR(100) NOT NULL UNIQUE,
  `value` LONGTEXT NULL DEFAULT NULL,
  `group` VARCHAR(50) NOT NULL DEFAULT 'general',
  `is_public` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `system_settings`
INSERT INTO `system_settings` (`id`, `key`, `value`, `group`, `is_public`, `created_at`, `updated_at`) VALUES
(1, 'platform_name', 'BizNetwork', 'general', 1, '2026-09-17 22:54:18', '2026-09-17 22:54:18'),
(2, 'platform_tagline', 'Small Tasks. Big Opportunities.', 'general', 1, '2026-09-17 22:54:18', '2026-09-17 22:54:18'),
(3, 'min_withdrawal_cents', 1000, 'finance', 1, '2026-09-17 22:54:18', '2026-09-17 22:54:18'),
(4, 'platform_fee_percent', 15, 'finance', 1, '2026-09-17 22:54:18', '2026-09-17 22:54:18'),
(5, 'support_email', 'support@biznetwork.com', 'support', 1, '2026-09-17 22:54:18', '2026-09-17 22:54:18');

-- --------------------------------------------------------
-- Table structure for table `personal_access_tokens`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` VARCHAR(255) NOT NULL,
  `tokenable_id` BIGINT UNSIGNED NOT NULL,
  `name` TEXT NOT NULL,
  `token` VARCHAR(64) NOT NULL UNIQUE,
  `abilities` TEXT NULL DEFAULT NULL,
  `last_used_at` TIMESTAMP NULL DEFAULT NULL,
  `expires_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`, `tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `migrations`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` VARCHAR(255) NOT NULL,
  `batch` INT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `migrations`
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_09_16_000001_create_profiles_table', 1),
(5, '2026_09_16_000002_create_businesses_table', 1),
(6, '2026_09_16_000003_create_task_categories_table', 1),
(7, '2026_09_16_000004_create_campaigns_table', 1),
(8, '2026_09_16_000005_create_tasks_table', 1),
(9, '2026_09_16_000006_create_task_assignments_table', 1),
(10, '2026_09_16_000007_create_task_submissions_table', 1),
(11, '2026_09_16_000008_create_submission_files_table', 1),
(12, '2026_09_16_000009_create_ai_verification_results_table', 1),
(13, '2026_09_16_000010_create_wallets_table', 1),
(14, '2026_09_16_000011_create_wallet_transactions_table', 1),
(15, '2026_09_16_000012_create_withdrawal_requests_table', 1),
(16, '2026_09_16_000013_create_referrals_table', 1),
(17, '2026_09_16_000014_create_fraud_events_table', 1),
(18, '2026_09_16_000015_create_feature_flags_table', 1),
(19, '2026_09_16_000016_create_audit_logs_table', 1),
(20, '2026_09_16_000017_create_support_tickets_table', 1),
(21, '2026_09_16_000018_create_support_messages_table', 1),
(22, '2026_09_16_000019_create_system_settings_table', 1),
(23, '2026_09_16_155208_create_personal_access_tokens_table', 1);

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
