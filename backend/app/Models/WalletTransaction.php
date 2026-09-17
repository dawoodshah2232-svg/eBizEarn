<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WalletTransaction extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'wallet_id',
        'type',
        'amount_cents',
        'balance_after_cents',
        'currency',
        'reference_type',
        'reference_id',
        'description',
        'metadata_json',
        'created_at',
    ];

    protected $casts = [
        'amount_cents' => 'integer',
        'balance_after_cents' => 'integer',
        'metadata_json' => 'array',
        'created_at' => 'datetime',
    ];

    public function wallet(): BelongsTo
    {
        return $this->belongsTo(Wallet::class);
    }
}
