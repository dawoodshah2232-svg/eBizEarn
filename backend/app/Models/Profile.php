<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'avatar_url',
        'phone',
        'country_code',
        'city',
        'language',
        'bio',
        'contributor_level',
        'fraud_score',
        'completed_tasks_count',
        'approval_rate',
        'interests_json',
        'preferences_json',
    ];

    protected $casts = [
        'interests_json' => 'array',
        'preferences_json' => 'array',
        'approval_rate' => 'float',
        'completed_tasks_count' => 'integer',
        'fraud_score' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
