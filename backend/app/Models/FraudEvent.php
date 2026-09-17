<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FraudEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'submission_id',
        'event_type',
        'severity',
        'details_json',
        'ip_address',
        'user_agent',
        'status',
        'resolved_at',
    ];

    protected $casts = [
        'details_json' => 'array',
        'resolved_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function submission(): BelongsTo
    {
        return $this->belongsTo(TaskSubmission::class, 'submission_id');
    }
}
