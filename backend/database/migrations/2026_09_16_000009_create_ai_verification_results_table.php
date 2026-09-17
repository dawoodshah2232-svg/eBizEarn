<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ai_verification_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('submission_id')->constrained('task_submissions')->cascadeOnDelete();
            $table->unsignedSmallInteger('confidence_score')->default(0); // 0-100
            $table->unsignedSmallInteger('risk_score')->default(0);       // 0-100
            $table->unsignedSmallInteger('duplicate_risk')->default(0);   // 0-100
            $table->unsignedSmallInteger('proof_quality')->default(0);    // 0-100
            $table->unsignedSmallInteger('content_match')->default(0);    // 0-100
            $table->unsignedSmallInteger('policy_match')->default(0);     // 0-100
            $table->enum('suggested_decision', ['approve', 'reject', 'flag'])->default('approve');
            $table->text('analysis_summary');
            $table->json('raw_payload_json')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ai_verification_results');
    }
};
