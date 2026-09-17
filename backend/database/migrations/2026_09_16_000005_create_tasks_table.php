<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('campaign_id')->constrained('campaigns')->cascadeOnDelete();
            $table->foreignId('category_id')->constrained('task_categories');
            $table->string('title');
            $table->unsignedBigInteger('reward_cents');
            $table->unsignedInteger('estimated_minutes')->default(5);
            $table->enum('difficulty', ['easy', 'medium', 'hard'])->default('easy');
            $table->enum('status', ['available', 'paused', 'completed'])->default('available');
            $table->unsignedInteger('slots_total');
            $table->unsignedInteger('slots_taken')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
