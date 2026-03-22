<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\SocialAccount;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
class SocialAuthController extends Controller {
 public function redirect(string $provider): JsonResponse { return response()->json(['url'=>Socialite::driver($provider)->stateless()->redirect()->getTargetUrl()]); }
 public function callback(string $provider): JsonResponse { $socialUser = Socialite::driver($provider)->stateless()->user(); $user = User::firstOrCreate(['email'=>$socialUser->getEmail()],['name'=>$socialUser->getName() ?: 'Social User','password'=>bcrypt(str()->random(32))]); SocialAccount::updateOrCreate(['provider'=>$provider,'provider_user_id'=>$socialUser->getId()],['user_id'=>$user->id,'provider_email'=>$socialUser->getEmail(),'meta'=>['avatar'=>$socialUser->getAvatar()]]); Auth::login($user); return response()->json(['user'=>$user,'token'=>$user->createToken('spa')->plainTextToken]); }
}
