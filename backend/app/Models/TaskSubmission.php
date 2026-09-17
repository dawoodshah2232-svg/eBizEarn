<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class TaskSubmission extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'task_id',
        'user_id',
        'assignment_id',
        'status',
        'proof_data_json',
        'reviewer_id',
        'reviewed_at',
        'review_notes',
    ];

    protected $casts = [
        'proof_data_json' => 'array',
        'reviewed_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::creating(function (TaskSubmission $sub) {
            if (empty($sub->uuid)) {
                $sub->uuid = (string) Str::uuid();
            }
        });
    }

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function assignment(): BelongsTo
    {
        return $this->belongsTo(TaskAssignment::class, 'assignment_id');
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }

    public function files(): HasMany
    {
        return $this->hasMany(SubmissionFile::class, 'submission_id');
    }

    public function aiResult(): HasOne
    {
        return $this->hasOne(AiVerificationResult::class, 'submission_id');
    }
}
