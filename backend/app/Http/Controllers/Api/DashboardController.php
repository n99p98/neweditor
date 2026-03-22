<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
class DashboardController extends Controller { public function index(): JsonResponse { $user = auth()->user(); return response()->json(['data'=>['projects'=>$user->projects()->count(),'exports'=>$user->exports()->count(),'orders'=>$user->orders()->count(),'recent_projects'=>$user->projects()->latest()->take(5)->get()]]); } }
