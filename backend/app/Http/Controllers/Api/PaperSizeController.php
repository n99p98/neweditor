<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\PaperSize;
use Illuminate\Http\JsonResponse;
class PaperSizeController extends Controller { public function index(): JsonResponse { return response()->json(['data'=>PaperSize::query()->orderBy('name')->get()]); } }
