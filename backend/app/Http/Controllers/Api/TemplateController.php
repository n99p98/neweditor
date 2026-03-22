<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Template;
use Illuminate\Http\JsonResponse;
class TemplateController extends Controller {
 public function index(): JsonResponse { return response()->json(['data'=>Template::with(['category','paperSize','foldType','tags'])->where('is_published',true)->paginate(12)]); }
 public function show(Template $template): JsonResponse { return response()->json(['data'=>$template->load(['category','paperSize','foldType','tags','assets'])]); }
}
