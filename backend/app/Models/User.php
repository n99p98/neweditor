<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'is_admin', 'has_free_hd_downloads', 'email_verified_at'
    ];

    protected $hidden = ['password', 'remember_token'];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'is_admin' => 'boolean',
            'has_free_hd_downloads' => 'boolean',
            'password' => 'hashed',
        ];
    }

    public function projects(): HasMany { return $this->hasMany(Project::class); }
    public function uploads(): HasMany { return $this->hasMany(Upload::class); }
    public function orders(): HasMany { return $this->hasMany(Order::class); }
    public function exports(): HasMany { return $this->hasMany(Export::class); }
    public function socialAccounts(): HasMany { return $this->hasMany(SocialAccount::class); }
}
