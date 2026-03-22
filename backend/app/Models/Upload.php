<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Upload extends Model { protected $fillable=['user_id','disk','path','mime_type','size','kind','meta','is_private']; protected function casts(): array { return ['meta'=>'array','is_private'=>'boolean']; } }
