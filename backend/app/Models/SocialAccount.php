<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class SocialAccount extends Model { protected $fillable=['user_id','provider','provider_user_id','provider_email','meta']; protected function casts(): array { return ['meta'=>'array']; } }
