<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Export extends Model { protected $fillable=['user_id','project_id','type','status','disk','path','watermarked','meta','completed_at']; protected function casts(): array { return ['meta'=>'array','watermarked'=>'boolean','completed_at'=>'datetime']; } }
