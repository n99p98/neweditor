<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn () => response()->json(['name' => 'PrintFold Studio API', 'status' => 'ok']));
