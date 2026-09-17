<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Business extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'uuid',
        'owner_id',
        'company_name',
        'website',
        'industry',
        'billing_email',
        'status',
        'verified_at',
    ];

    protected $casts = [
        'verified_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::creating(function (Business $b) {
            if (empty($b->uuid)) {
                $b->uuid = (string) Str::uuid();
            }
        });
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function campaigns(): HasMany
    {
        return $this->hasMany(Campaign::class);
    }
}
