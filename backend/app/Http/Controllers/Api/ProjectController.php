<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Models\Project;
use App\Services\Project\ProjectService;
use Illuminate\Http\JsonResponse;
class ProjectController extends Controller {
 public function __construct(private readonly ProjectService $projects) {}
 public function index(): JsonResponse { return response()->json(['data'=>auth()->user()->projects()->with('pages')->latest()->paginate(10)]); }
 public function store(StoreProjectRequest $request): JsonResponse { return response()->json(['data'=>$this->projects->create($request->validated(), $request->user()->id)],201); }
 public function show(Project $project): JsonResponse { $this->authorize('view',$project); return response()->json(['data'=>$project->load('pages')]); }
 public function update(UpdateProjectRequest $request, Project $project): JsonResponse { $this->authorize('update',$project); return response()->json(['data'=>$this->projects->update($project, $request->validated())]); }
 public function destroy(Project $project): JsonResponse { $this->authorize('delete',$project); $project->delete(); return response()->json(status:204); }
 public function duplicate(Project $project): JsonResponse { $this->authorize('view',$project); $copy = $project->replicate(); $copy->name .= ' Copy'; $copy->slug .= '-copy'; $copy->save(); foreach ($project->pages as $page) { $copy->pages()->create($page->only(['page_number','name','canvas_data'])); } return response()->json(['data'=>$copy->load('pages')],201); }
}
