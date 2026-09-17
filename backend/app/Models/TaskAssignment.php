<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class TaskAssignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'task_id',
        'user_id',
        'status',
        'reserved_until',
        'started_at',
        'completed_at',
    ];

    protected $casts = [
        'reserved_until' => 'datetime',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function submission(): HasOne
    {
        return $this->hasOne(TaskSubmission::class, 'assignment_id');
    }
}
