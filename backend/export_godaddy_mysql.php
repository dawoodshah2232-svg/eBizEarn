<?php

/**
 * GoDaddy MySQL Database Exporter
 * Converts SQLite schema and seeded data into production-ready MySQL / phpMyAdmin SQL.
 */

$sqlitePath = __DIR__ . '/database/database.sqlite';
$outputPath = __DIR__ . '/database/ebiznetwork_live.sql';

if (!file_exists($sqlitePath)) {
    die("Error: SQLite database not found at $sqlitePath\n");
}

$sqlite = new PDO("sqlite:$sqlitePath");
$sqlite->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$out = "-- =========================================================================\n";
$out .= "-- EBIZ NETWORK / BIZNETWORK PRODUCTION DATABASE DUMP\n";
$out .= "-- Target RDBMS: MySQL 8.x / 5.7+ & MariaDB 10.x (GoDaddy cPanel / phpMyAdmin)\n";
$out .= "-- Generated: " . date('Y-m-d H:i:s T') . "\n";
$out .= "-- =========================================================================\n\n";

$out .= "SET FOREIGN_KEY_CHECKS = 0;\n";
$out .= "SET SQL_MODE = \"NO_AUTO_VALUE_ON_ZERO\";\n";
$out .= "SET AUTOCOMMIT = 0;\n";
$out .= "START TRANSACTION;\n";
$out .= "SET time_zone = \"+00:00\";\n";
$out .= "SET NAMES utf8mb4;\n\n";

// Table definitions crafted specifically for MySQL / Laravel 11 compatibility
$tables = [
    'users' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `users` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'password_reset_tokens' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` VARCHAR(255) NOT NULL,
  `token` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'sessions' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `sessions` (
  `id` VARCHAR(255) NOT NULL,
  `user_id` BIGINT UNSIGNED NULL DEFAULT NULL,
  `ip_address` VARCHAR(45) NULL DEFAULT NULL,
  `user_agent` TEXT NULL DEFAULT NULL,
  `payload` LONGTEXT NOT NULL,
  `last_activity` INT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'cache' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `cache` (
  `key` VARCHAR(255) NOT NULL,
  `value` MEDIUMTEXT NOT NULL,
  `expiration` INT NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'cache_locks' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` VARCHAR(255) NOT NULL,
  `owner` VARCHAR(255) NOT NULL,
  `expiration` INT NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'jobs' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `jobs` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `queue` VARCHAR(255) NOT NULL,
  `payload` LONGTEXT NOT NULL,
  `attempts` TINYINT UNSIGNED NOT NULL,
  `reserved_at` INT UNSIGNED NULL DEFAULT NULL,
  `available_at` INT UNSIGNED NOT NULL,
  `created_at` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'job_batches' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `job_batches` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'failed_jobs' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(255) NOT NULL UNIQUE,
  `connection` TEXT NOT NULL,
  `queue` TEXT NOT NULL,
  `payload` LONGTEXT NOT NULL,
  `exception` LONGTEXT NOT NULL,
  `failed_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'profiles' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `profiles` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'businesses' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `businesses` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'task_categories' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `task_categories` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'campaigns' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `campaigns` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'tasks' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `tasks` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'task_assignments' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `task_assignments` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'task_submissions' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `task_submissions` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'submission_files' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `submission_files` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'ai_verification_results' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `ai_verification_results` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'wallets' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `wallets` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'wallet_transactions' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `wallet_transactions` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'withdrawal_requests' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `withdrawal_requests` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'referrals' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `referrals` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'fraud_events' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `fraud_events` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'feature_flags' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `feature_flags` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `key` VARCHAR(100) NOT NULL UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `is_enabled` TINYINT(1) NOT NULL DEFAULT 0,
  `rules_json` LONGTEXT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'audit_logs' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `audit_logs` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'support_tickets' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `support_tickets` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'support_messages' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `support_messages` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'system_settings' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `system_settings` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `key` VARCHAR(100) NOT NULL UNIQUE,
  `value` LONGTEXT NULL DEFAULT NULL,
  `group` VARCHAR(50) NOT NULL DEFAULT 'general',
  `is_public` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'personal_access_tokens' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],

    'migrations' => [
        'ddl' => "CREATE TABLE IF NOT EXISTS `migrations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` VARCHAR(255) NOT NULL,
  `batch` INT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    ],
];

foreach ($tables as $tableName => $meta) {
    $out .= "-- --------------------------------------------------------\n";
    $out .= "-- Table structure for table `$tableName`\n";
    $out .= "-- --------------------------------------------------------\n";
    $out .= "DROP TABLE IF EXISTS `$tableName`;\n";
    $out .= $meta['ddl'] . "\n\n";

    // Export rows if table exists in SQLite (skip transient cache/session tables)
    $skipData = ['sessions', 'cache', 'cache_locks', 'jobs', 'job_batches', 'failed_jobs'];
    $hasTable = $sqlite->query("SELECT name FROM sqlite_master WHERE type='table' AND name='$tableName'")->fetchColumn();
    if ($hasTable && !in_array($tableName, $skipData)) {
        $rows = $sqlite->query("SELECT * FROM \"$tableName\"")->fetchAll(PDO::FETCH_ASSOC);
        if (!empty($rows)) {
            $out .= "-- Dumping data for table `$tableName`\n";
            $columns = array_keys($rows[0]);
            $quotedCols = array_map(function($c) { return "`$c`"; }, $columns);
            $colsList = implode(', ', $quotedCols);

            $valChunks = [];
            foreach ($rows as $row) {
                $vals = [];
                foreach ($columns as $c) {
                    $v = $row[$c];
                    if ($v === null) {
                        $vals[] = 'NULL';
                    } elseif (is_numeric($v) && !str_starts_with((string)$v, '+') && !str_starts_with((string)$v, '0')) {
                        $vals[] = $v;
                    } else {
                        $escaped = str_replace(
                            ["\\", "\x00", "\n", "\r", "'", '"', "\x1a"],
                            ["\\\\", "\\0", "\\n", "\\r", "\\'", '\\"', "\\Z"],
                            (string)$v
                        );
                        $vals[] = "'$escaped'";
                    }
                }
                $valChunks[] = '(' . implode(', ', $vals) . ')';
            }

            // Group into batches of 50 inserts for speed and phpMyAdmin compatibility
            $batches = array_chunk($valChunks, 50);
            foreach ($batches as $batch) {
                $out .= "INSERT INTO `$tableName` ($colsList) VALUES\n" . implode(",\n", $batch) . ";\n";
            }
            $out .= "\n";
        }
    }
}

$out .= "SET FOREIGN_KEY_CHECKS = 1;\n";
$out .= "COMMIT;\n";

file_put_contents($outputPath, $out);
$bytes = strlen($out);
echo "Successfully exported GoDaddy MySQL database dump to:\n$outputPath (" . round($bytes / 1024, 2) . " KB)\n";
