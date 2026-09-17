<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('task_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task_id')->constrained('tasks')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->enum('status', ['reserved', 'in_progress', 'submitted', 'completed', 'expired', 'cancelled'])->default('in_progress');
            $table->timestamp('reserved_until')->nullable();
            $table->timestamp('started_at')->useCurrent();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            $table->index(['task_id', 'user_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('task_assignments');
    }
};
