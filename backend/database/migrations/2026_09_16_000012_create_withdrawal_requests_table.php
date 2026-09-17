<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('withdrawal_requests', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('wallet_id')->constrained('wallets')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->unsignedBigInteger('amount_cents');
            $table->unsignedBigInteger('fee_cents')->default(0);
            $table->string('currency', 4)->default('USD');
            $table->string('payout_method'); // bank_transfer, paypal, wise, crypto
            $table->json('payout_details_json'); // recipient address, bank details
            $table->enum('status', [
                'requested',
                'compliance_check',
                'processing',
                'paid',
                'failed',
                'rejected',
                'cancelled'
            ])->default('requested');
            $table->timestamp('processed_at')->nullable();
            $table->string('provider_transaction_id')->nullable();
            $table->text('admin_notes')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'status']);
            $table->index(['status', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('withdrawal_requests');
    }
};
