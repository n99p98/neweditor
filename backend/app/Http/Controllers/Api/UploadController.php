<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\Upload\StoreUploadRequest;
use App\Models\Upload;
use App\Services\Upload\UploadService;
use Illuminate\Http\JsonResponse;
class UploadController extends Controller {
 public function __construct(private readonly UploadService $uploads) {}
 public function index(): JsonResponse {
  $userId = auth()->id();
  abort_unless($userId, 401);
  return response()->json(['data' => $this->uploads->listForUser($userId)->map(fn (Upload $upload) => [
   'id' => $upload->id,
   'kind' => $upload->kind,
   'mime_type' => $upload->mime_type,
   'size' => $upload->size,
   'original_name' => $upload->meta['original_name'] ?? basename($upload->path),
   'created_at' => $upload->created_at,
 ])]);
 }
 public function store(StoreUploadRequest $request): JsonResponse {
  $userId = $request->user()?->id;
  abort_unless($userId, 401);
  $upload = $this->uploads->store($request->file('file'), $userId, $request->string('kind')->toString());
  return response()->json(['data'=>[
   'id' => $upload->id,
   'kind' => $upload->kind,
   'mime_type' => $upload->mime_type,
   'size' => $upload->size,
   'original_name' => $upload->meta['original_name'] ?? basename($upload->path),
   'created_at' => $upload->created_at,
  ]],201);
 }
 public function destroy(Upload $upload): \Illuminate\Http\Response {
  abort_unless($upload->user_id === auth()->id(), 403);
  $this->uploads->delete($upload);
  return response()->noContent();
 }
}
