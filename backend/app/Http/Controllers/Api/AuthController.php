<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
class AuthController extends Controller {
 public function register(RegisterRequest $request): JsonResponse { $user = User::create($request->validated()); Auth::login($user); return response()->json(['user'=>$user,'token'=>$user->createToken('spa')->plainTextToken],201); }
 public function login(LoginRequest $request): JsonResponse { if (!Auth::attempt($request->only('email','password'), (bool) $request->boolean('remember'))) { return response()->json(['message'=>'Invalid credentials'],422); } $user = User::where('email',$request->input('email'))->firstOrFail(); return response()->json(['user'=>$user,'token'=>$user->createToken('spa')->plainTextToken]); }
 public function me(Request $request): JsonResponse { return response()->json(['user'=>$request->user()]); }
 public function logout(Request $request): JsonResponse { $request->user()->currentAccessToken()?->delete(); Auth::guard('web')->logout(); return response()->json(['message'=>'Logged out']); }
 public function forgotPassword(Request $request): JsonResponse { $request->validate(['email'=>['required','email']]); Password::sendResetLink($request->only('email')); return response()->json(['message'=>'Reset link sent']); }
 public function resetPassword(Request $request): JsonResponse { $request->validate(['token'=>'required','email'=>'required|email','password'=>'required|confirmed|min:8']); return response()->json(['status'=>Password::RESET_LINK_SENT]); }
}
