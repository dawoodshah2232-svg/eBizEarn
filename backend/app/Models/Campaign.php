<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Campaign extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'uuid',
        'business_id',
        'category_id',
        'title',
        'objective',
        'description',
        'instructions_markdown',
        'proof_requirements_json',
        'status',
        'total_budget_cents',
        'remaining_budget_cents',
        'reserved_budget_cents',
        'reward_per_task_cents',
        'platform_fee_cents',
        'target_contributors_count',
        'completed_contributors_count',
        'target_countries_json',
        'target_languages_json',
        'min_contributor_level',
        'retention_hours',
        'starts_at',
        'ends_at',
    ];

    protected $casts = [
        'proof_requirements_json' => 'array',
        'target_countries_json' => 'array',
        'target_languages_json' => 'array',
        'total_budget_cents' => 'integer',
        'remaining_budget_cents' => 'integer',
        'reserved_budget_cents' => 'integer',
        'reward_per_task_cents' => 'integer',
        'platform_fee_cents' => 'integer',
        'target_contributors_count' => 'integer',
        'completed_contributors_count' => 'integer',
        'retention_hours' => 'integer',
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::creating(function (Campaign $c) {
            if (empty($c->uuid)) {
                $c->uuid = (string) Str::uuid();
            }
        });
    }

    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(TaskCategory::class, 'category_id');
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}
