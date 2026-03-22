<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class PaperSize extends Model { protected $fillable=['name','slug','width_mm','height_mm','is_custom']; protected function casts(): array { return ['is_custom'=>'boolean']; } }
