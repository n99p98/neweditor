<?php
namespace App\Services\Export;
use App\Enums\ExportType;
use App\Jobs\GenerateProjectExportJob;
use App\Models\Export;
use App\Models\Project;
class ExportService {
 public function queue(Project $project, int $userId, ExportType $type): Export {
  $export = Export::create(['user_id'=>$userId,'project_id'=>$project->id,'type'=>$type->value,'status'=>'queued','watermarked'=>$type === ExportType::Preview]);
  GenerateProjectExportJob::dispatch($export->id);
  return $export;
 }
}
