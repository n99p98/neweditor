<?php
namespace App\Http\Controllers\Api\Admin;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class AdminUserController extends Controller {
 public function index(): JsonResponse { return response()->json(['data'=>User::latest()->paginate(20)]); }
 public function show(User $user): JsonResponse { return response()->json(['data'=>$user]); }
 public function update(Request $request, User $user): JsonResponse { $user->update($request->validate(['is_admin'=>'sometimes|boolean','has_free_hd_downloads'=>'sometimes|boolean'])); return response()->json(['data'=>$user]); }
}
