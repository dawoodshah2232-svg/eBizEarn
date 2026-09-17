<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Wallet extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'currency',
        'available_balance_cents',
        'pending_balance_cents',
        'lifetime_earnings_cents',
        'total_withdrawn_cents',
        'is_locked',
    ];

    protected $casts = [
        'available_balance_cents' => 'integer',
        'pending_balance_cents' => 'integer',
        'lifetime_earnings_cents' => 'integer',
        'total_withdrawn_cents' => 'integer',
        'is_locked' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(WalletTransaction::class)->latest('created_at');
    }

    public function withdrawalRequests(): HasMany
    {
        return $this->hasMany(WithdrawalRequest::class)->latest();
    }
}
