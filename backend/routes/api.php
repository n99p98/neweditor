<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ExportController;
use App\Http\Controllers\Api\PaperSizeController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\SocialAuthController;
use App\Http\Controllers\Api\TemplateController;
use App\Http\Controllers\Api\UploadController;
use App\Http\Controllers\Api\Admin\AdminSettingsController;
use App\Http\Controllers\Api\Admin\AdminTemplateController;
use App\Http\Controllers\Api\Admin\AdminUserController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('reset-password', [AuthController::class, 'resetPassword']);
    Route::get('social/{provider}/redirect', [SocialAuthController::class, 'redirect']);
    Route::get('social/{provider}/callback', [SocialAuthController::class, 'callback']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout']);
    });
});

Route::get('templates', [TemplateController::class, 'index']);
Route::get('templates/{template:slug}', [TemplateController::class, 'show']);
Route::get('paper-sizes', [PaperSizeController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('projects', ProjectController::class);
    Route::post('projects/{project}/duplicate', [ProjectController::class, 'duplicate']);
    Route::post('uploads', [UploadController::class, 'store']);
    Route::get('dashboard', [DashboardController::class, 'index']);

    Route::post('exports/preview', [ExportController::class, 'preview']);
    Route::post('exports/hd', [ExportController::class, 'hd']);
    Route::get('exports/{export}', [ExportController::class, 'show']);
    Route::get('exports/{export}/download', [ExportController::class, 'download']);

    Route::post('checkout/intent', [CheckoutController::class, 'createIntent']);
    Route::post('checkout/webhook', [CheckoutController::class, 'webhook'])->withoutMiddleware(['auth:sanctum']);

    Route::prefix('admin')->middleware('can:access-admin')->group(function () {
        Route::apiResource('templates', AdminTemplateController::class);
        Route::apiResource('users', AdminUserController::class)->only(['index', 'show', 'update']);
        Route::get('settings', [AdminSettingsController::class, 'index']);
        Route::put('settings', [AdminSettingsController::class, 'update']);
    });
});
