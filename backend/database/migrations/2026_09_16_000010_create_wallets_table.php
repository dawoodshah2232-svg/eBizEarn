<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('wallets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained('users')->cascadeOnDelete();
            $table->string('currency', 4)->default('USD');
            $table->bigInteger('available_balance_cents')->default(0);
            $table->bigInteger('pending_balance_cents')->default(0);
            $table->bigInteger('lifetime_earnings_cents')->default(0);
            $table->bigInteger('total_withdrawn_cents')->default(0);
            $table->boolean('is_locked')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('wallets');
    }
};
