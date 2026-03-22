<?php
namespace App\Jobs;
use App\Models\Export;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
class GenerateProjectExportJob implements ShouldQueue {
 use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
 public function __construct(public int $exportId) {}
 public function handle(): void {
  $export = Export::with('project.pages')->findOrFail($this->exportId);
  $html = view('exports.project', ['export'=>$export,'project'=>$export->project])->render();
  $dir = $export->type === 'preview' ? 'previews' : 'exports';
  $path = $dir.'/project-'.$export->project_id.'-'.$export->id.'.html';
  Storage::disk('local')->put($path, $html);
  $export->update(['status'=>'completed','disk'=>'local','path'=>$path,'completed_at'=>now(),'meta'=>['rendered_via'=>'html-placeholder','note'=>'Replace with Browsershot in production environment.']]);
 }
}
