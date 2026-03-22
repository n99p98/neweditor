<?php
return [
 'default' => env('FILESYSTEM_DISK', 'local'),
 'disks' => [
  'local' => ['driver' => 'local', 'root' => storage_path('app')],
  'private' => ['driver' => 'local', 'root' => storage_path('app/private')],
  'public' => ['driver' => 'local', 'root' => storage_path('app/public'), 'url' => env('APP_URL').'/storage', 'visibility' => 'public'],
  's3' => ['driver' => 's3', 'key' => env('AWS_ACCESS_KEY_ID')],
 ],
];
