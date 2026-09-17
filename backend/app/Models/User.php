<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'uuid',
        'name',
        'email',
        'password',
        'role',
        'status',
        'referral_code',
        'referrer_id',
        'email_verified_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (User $user) {
            if (empty($user->uuid)) {
                $user->uuid = (string) Str::uuid();
            }
            if (empty($user->referral_code)) {
                $user->referral_code = strtoupper(Str::random(8));
            }
        });
    }

    public function profile(): HasOne
    {
        return $this->hasOne(Profile::class);
    }

    public function wallet(): HasOne
    {
        return $this->hasOne(Wallet::class);
    }

    public function business(): HasOne
    {
        return $this->hasOne(Business::class, 'owner_id');
    }

    public function taskAssignments(): HasMany
    {
        return $this->hasMany(TaskAssignment::class);
    }

    public function submissions(): HasMany
    {
        return $this->hasMany(TaskSubmission::class);
    }

    public function referrals(): HasMany
    {
        return $this->hasMany(Referral::class, 'referrer_id');
    }

    public function referrer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'referrer_id');
    }

    public function withdrawalRequests(): HasMany
    {
        return $this->hasMany(WithdrawalRequest::class);
    }

    public function fraudEvents(): HasMany
    {
        return $this->hasMany(FraudEvent::class);
    }

    public function supportTickets(): HasMany
    {
        return $this->hasMany(SupportTicket::class);
    }

    public function isContributor(): bool
    {
        return $this->role === 'contributor';
    }

    public function isBusiness(): bool
    {
        return $this->role === 'business';
    }

    public function isAdmin(): bool
    {
        return in_array($this->role, ['admin', 'superadmin'], true);
    }

    public function isSuperAdmin(): bool
    {
        return $this->role === 'superadmin';
    }
}
