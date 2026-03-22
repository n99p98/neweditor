<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
class Project extends Model {
 use SoftDeletes;
 protected $fillable=['user_id','template_id','paper_size_id','fold_type_id','name','slug','status','thumbnail_path','meta','is_favorite','last_opened_at'];
 protected function casts(): array { return ['meta'=>'array','is_favorite'=>'boolean','last_opened_at'=>'datetime']; }
 public function user(): BelongsTo { return $this->belongsTo(User::class); }
 public function pages(): HasMany { return $this->hasMany(ProjectPage::class); }
}
