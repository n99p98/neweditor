<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class ProjectElement extends Model { protected $fillable=['project_page_id','element_key','element_type','z_index','payload']; protected function casts(): array { return ['payload'=>'array']; } }
