<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class TemplateAsset extends Model { protected $fillable=['template_id','type','path','meta']; protected function casts(): array { return ['meta'=>'array']; } public function template(): BelongsTo { return $this->belongsTo(Template::class); } }
