<?php
return [
 'name' => env('APP_NAME', 'PrintFold Studio'),
 'env' => env('APP_ENV', 'local'),
 'debug' => (bool) env('APP_DEBUG', true),
 'url' => env('APP_URL', 'http://localhost:9000'),
 'frontend_url' => env('FRONTEND_URL', 'http://localhost:3000'),
 'key' => env('APP_KEY'),
 'providers' => [App\Providers\AuthServiceProvider::class],
];
