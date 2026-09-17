<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeatureFlag extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'name',
        'description',
        'is_enabled',
        'rules_json',
    ];

    protected $casts = [
        'is_enabled' => 'boolean',
        'rules_json' => 'array',
    ];

    public static function isEnabled(string $key, bool $default = false): bool
    {
        $flag = static::where('key', $key)->first();
        return $flag ? (bool) $flag->is_enabled : $default;
    }
}
