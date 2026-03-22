<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\Upload\StoreUploadRequest;
use App\Services\Upload\UploadService;
use Illuminate\Http\JsonResponse;
class UploadController extends Controller { public function __construct(private readonly UploadService $uploads) {} public function store(StoreUploadRequest $request): JsonResponse { return response()->json(['data'=>$this->uploads->store($request->file('file'), $request->user()->id, $request->string('kind')->toString())],201); } }
