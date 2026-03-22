<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
class ProjectPage extends Model { protected $fillable=['project_id','page_number','name','canvas_data']; protected function casts(): array { return ['canvas_data'=>'array']; } public function project(): BelongsTo { return $this->belongsTo(Project::class); } public function elements(): HasMany { return $this->hasMany(ProjectElement::class); } }
