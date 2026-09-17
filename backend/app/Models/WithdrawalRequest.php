<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class WithdrawalRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'wallet_id',
        'user_id',
        'amount_cents',
        'fee_cents',
        'currency',
        'payout_method',
        'payout_details_json',
        'status',
        'processed_at',
        'provider_transaction_id',
        'admin_notes',
    ];

    protected $casts = [
        'amount_cents' => 'integer',
        'fee_cents' => 'integer',
        'payout_details_json' => 'array',
        'processed_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::creating(function (WithdrawalRequest $req) {
            if (empty($req->uuid)) {
                $req->uuid = (string) Str::uuid();
            }
        });
    }

    public function wallet(): BelongsTo
    {
        return $this->belongsTo(Wallet::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
