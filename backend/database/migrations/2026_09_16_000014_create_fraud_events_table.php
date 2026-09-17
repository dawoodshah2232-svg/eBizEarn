<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fraud_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('submission_id')->nullable()->constrained('task_submissions')->nullOnDelete();
            $table->string('event_type'); // duplicate_proof, rapid_completion, ip_anomaly, proxy_vpn, multi_account
            $table->enum('severity', ['low', 'medium', 'high', 'critical'])->default('low');
            $table->json('details_json')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->enum('status', ['flagged', 'reviewed', 'dismissed', 'confirmed_fraud'])->default('flagged');
            $table->timestamp('resolved_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'severity']);
            $table->index(['event_type', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fraud_events');
    }
};
