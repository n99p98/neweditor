<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
class Template extends Model {
 use SoftDeletes;
 protected $fillable=['category_id','paper_size_id','fold_type_id','name','slug','excerpt','description','orientation','thumbnail_path','preview_image_path','canvas_schema','is_featured','is_published'];
 protected function casts(): array { return ['canvas_schema'=>'array','is_featured'=>'boolean','is_published'=>'boolean']; }
 public function category(): BelongsTo { return $this->belongsTo(TemplateCategory::class,'category_id'); }
 public function paperSize(): BelongsTo { return $this->belongsTo(PaperSize::class); }
 public function foldType(): BelongsTo { return $this->belongsTo(FoldType::class); }
 public function tags(): BelongsToMany { return $this->belongsToMany(TemplateTag::class,'template_template_tag'); }
 public function assets(): HasMany { return $this->hasMany(TemplateAsset::class); }
}
