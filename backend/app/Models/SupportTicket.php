<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class SupportTicket extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'user_id',
        'subject',
        'category',
        'priority',
        'status',
        'assigned_agent_id',
    ];

    protected static function booted(): void
    {
        static::creating(function (SupportTicket $t) {
            if (empty($t->uuid)) {
                $t->uuid = (string) Str::uuid();
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function assignedAgent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_agent_id');
    }

    public function messages(): HasMany
    {
        return $this->hasMany(SupportMessage::class, 'ticket_id')->oldest();
    }
}
