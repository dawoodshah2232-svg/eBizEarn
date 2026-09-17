<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('wallet_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('wallet_id')->constrained('wallets')->cascadeOnDelete();
            $table->enum('type', [
                'task_reward',
                'referral_reward',
                'withdrawal',
                'withdrawal_reversal',
                'campaign_funding',
                'campaign_refund',
                'admin_adjustment',
                'bonus'
            ]);
            $table->bigInteger('amount_cents'); // Positive for credit, negative for debit
            $table->bigInteger('balance_after_cents');
            $table->string('currency', 4)->default('USD');
            $table->string('reference_type')->nullable();
            $table->unsignedBigInteger('reference_id')->nullable();
            $table->string('description');
            $table->json('metadata_json')->nullable();
            $table->timestamp('created_at')->useCurrent();

            $table->index(['wallet_id', 'created_at']);
            $table->index(['reference_type', 'reference_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('wallet_transactions');
    }
};
