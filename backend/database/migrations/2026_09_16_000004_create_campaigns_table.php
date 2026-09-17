<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('business_id')->constrained('businesses')->cascadeOnDelete();
            $table->foreignId('category_id')->constrained('task_categories');
            $table->string('title');
            $table->string('objective')->nullable();
            $table->text('description');
            $table->longText('instructions_markdown')->nullable();
            $table->json('proof_requirements_json')->nullable();
            $table->enum('status', ['draft', 'active', 'paused', 'completed', 'cancelled'])->default('active');
            $table->unsignedBigInteger('total_budget_cents');
            $table->unsignedBigInteger('remaining_budget_cents');
            $table->unsignedBigInteger('reserved_budget_cents')->default(0);
            $table->unsignedBigInteger('reward_per_task_cents');
            $table->unsignedBigInteger('platform_fee_cents')->default(0);
            $table->unsignedInteger('target_contributors_count');
            $table->unsignedInteger('completed_contributors_count')->default(0);
            $table->json('target_countries_json')->nullable();
            $table->json('target_languages_json')->nullable();
            $table->enum('min_contributor_level', ['starter', 'explorer', 'trusted', 'pro', 'elite'])->default('starter');
            $table->unsignedInteger('retention_hours')->default(24);
            $table->timestamp('starts_at')->nullable();
            $table->timestamp('ends_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('campaigns');
    }
};
