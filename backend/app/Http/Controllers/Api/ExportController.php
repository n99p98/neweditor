<?php
namespace App\Http\Controllers\Api;
use App\Enums\ExportType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Export\CreateExportRequest;
use App\Models\Export;
use App\Models\Project;
use App\Services\Export\ExportService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
class ExportController extends Controller {
 public function __construct(private readonly ExportService $exports) {}
 public function preview(CreateExportRequest $request): JsonResponse { $project = Project::findOrFail($request->integer('project_id')); $this->authorize('view',$project); return response()->json(['data'=>$this->exports->queue($project, $request->user()->id, ExportType::Preview)],202); }
 public function hd(CreateExportRequest $request): JsonResponse { $project = Project::findOrFail($request->integer('project_id')); $this->authorize('downloadHd',$project); return response()->json(['data'=>$this->exports->queue($project, $request->user()->id, ExportType::Hd)],202); }
 public function show(Export $export): JsonResponse { $this->authorize('view',$export); return response()->json(['data'=>$export]); }
 public function download(Export $export) { $this->authorize('view',$export); abort_unless($export->path,404); return Storage::disk($export->disk)->download($export->path); }
}
