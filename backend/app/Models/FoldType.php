<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class FoldType extends Model { protected $fillable=['name','slug','guides','description']; protected function casts(): array { return ['guides'=>'array']; } }
