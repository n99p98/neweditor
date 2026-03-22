<?php
namespace App\Services\Project;
use App\Models\Project;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
class ProjectService {
 public function create(array $data, int $userId): Project {
  $project = Project::create([
   'user_id'=>$userId,'template_id'=>$data['template_id']??null,'paper_size_id'=>$data['paper_size_id']??null,'fold_type_id'=>$data['fold_type_id']??null,
   'name'=>$data['name'],'slug'=>Str::slug($data['name']).'-'.Str::lower(Str::random(6)),'meta'=>$data['meta']??[],'status'=>'draft','last_opened_at'=>now(),
  ]);
  foreach ($data['pages'] as $page) {
   $project->pages()->create(Arr::only($page,['page_number','name','canvas_data']));
  }
  return $project->load('pages');
 }
 public function update(Project $project, array $data): Project {
  $project->update(['name'=>$data['name'],'meta'=>$data['meta']??$project->meta,'last_opened_at'=>now()]);
  $project->pages()->delete();
  foreach ($data['pages'] as $page) { $project->pages()->create(Arr::only($page,['page_number','name','canvas_data'])); }
  return $project->fresh('pages');
 }
}
