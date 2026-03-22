<?php
namespace App\Services\Upload;
use App\Models\Upload;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
class UploadService {
 public function store(UploadedFile $file, int $userId, string $kind): Upload {
  $disk = 'private';
  $path = $file->store("uploads/{$userId}/{$kind}", $disk);
  return Upload::create(['user_id'=>$userId,'disk'=>$disk,'path'=>$path,'mime_type'=>$file->getClientMimeType(),'size'=>$file->getSize(),'kind'=>$kind,'meta'=>['original_name'=>$file->getClientOriginalName()],'is_private'=>true]);
 }
 public function listForUser(int $userId, string $kind = 'image'): Collection {
  return Upload::query()->where('user_id', $userId)->where('kind', $kind)->latest()->get();
 }
 public function delete(Upload $upload): void {
  Storage::disk($upload->disk)->delete($upload->path);
  $upload->delete();
 }
}
