<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('businesses', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('owner_id')->constrained('users')->cascadeOnDelete();
            $table->string('company_name');
            $table->string('website')->nullable();
            $table->string('industry')->nullable();
            $table->string('billing_email')->nullable();
            $table->enum('status', ['active', 'suspended', 'pending_approval'])->default('active');
            $table->timestamp('verified_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('businesses');
    }
};
