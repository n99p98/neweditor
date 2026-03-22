<?php
namespace App\Http\Controllers\Api\Admin;
use App\Http\Controllers\Controller;
use App\Models\Template;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class AdminTemplateController extends Controller {
 public function index(): JsonResponse { return response()->json(['data'=>Template::latest()->paginate(20)]); }
 public function store(Request $request): JsonResponse { $data = $request->validate(['name'=>'required','slug'=>'required|unique:templates,slug','orientation'=>'required','canvas_schema'=>'required|array']); return response()->json(['data'=>Template::create($data)],201); }
 public function show(Template $template): JsonResponse { return response()->json(['data'=>$template]); }
 public function update(Request $request, Template $template): JsonResponse { $template->update($request->validate(['name'=>'sometimes','orientation'=>'sometimes','canvas_schema'=>'sometimes|array','is_published'=>'sometimes|boolean'])); return response()->json(['data'=>$template]); }
 public function destroy(Template $template): JsonResponse { $template->delete(); return response()->json(status:204); }
}
