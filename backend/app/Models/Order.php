<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Order extends Model { protected $fillable=['user_id','project_id','status','currency','amount','meta']; protected function casts(): array { return ['meta'=>'array']; } }
