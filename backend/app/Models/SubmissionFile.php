<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SubmissionFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'submission_id',
        'file_type',
        'file_path',
        'file_url',
        'file_size_bytes',
        'mime_type',
    ];

    public function submission(): BelongsTo
    {
        return $this->belongsTo(TaskSubmission::class);
    }
}
