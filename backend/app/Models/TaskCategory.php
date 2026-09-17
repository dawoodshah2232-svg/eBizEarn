<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TaskCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'name',
        'description',
        'icon',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, 'category_id');
    }

    public function campaigns(): HasMany
    {
        return $this->hasMany(Campaign::class, 'category_id');
    }
}
