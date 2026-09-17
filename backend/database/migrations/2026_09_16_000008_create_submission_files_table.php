<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('submission_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('submission_id')->constrained('task_submissions')->cascadeOnDelete();
            $table->enum('file_type', ['screenshot', 'video', 'url', 'document'])->default('screenshot');
            $table->string('file_path');
            $table->string('file_url');
            $table->unsignedBigInteger('file_size_bytes')->nullable();
            $table->string('mime_type', 100)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('submission_files');
    }
};
