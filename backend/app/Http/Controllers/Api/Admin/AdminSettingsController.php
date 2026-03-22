<?php
namespace App\Http\Controllers\Api\Admin;
use App\Http\Controllers\Controller;
use App\Models\AppSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class AdminSettingsController extends Controller {
 public function index(): JsonResponse { return response()->json(['data'=>AppSetting::all()->groupBy('group')]); }
 public function update(Request $request): JsonResponse { foreach ($request->validate(['settings'=>'required|array'])['settings'] as $group => $items) { foreach ($items as $key => $value) { AppSetting::updateOrCreate(['group'=>$group,'key'=>$key],['value'=>$value]); } } return $this->index(); }
}
