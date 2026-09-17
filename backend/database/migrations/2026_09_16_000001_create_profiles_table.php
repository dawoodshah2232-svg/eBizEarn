<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('avatar_url')->nullable();
            $table->string('phone')->nullable();
            $table->string('country_code', 4)->default('AE');
            $table->string('city')->nullable();
            $table->string('language', 10)->default('en');
            $table->text('bio')->nullable();
            $table->enum('contributor_level', ['starter', 'explorer', 'trusted', 'pro', 'elite'])->default('starter');
            $table->integer('fraud_score')->default(0); // 0-100
            $table->unsignedInteger('completed_tasks_count')->default(0);
            $table->decimal('approval_rate', 5, 2)->default(100.00);
            $table->json('interests_json')->nullable();
            $table->json('preferences_json')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
