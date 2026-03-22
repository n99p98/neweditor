<?php
namespace App\Services\Payment;
use App\Models\Order;
use App\Models\Project;
use Illuminate\Support\Facades\Config;
use Stripe\StripeClient;
class StripeCheckoutService {
 public function createCheckout(Project $project, int $userId): array {
  $amount = (float) data_get(Config::get('services.printfold'), 'hd_price', 9.99);
  $order = Order::create(['user_id'=>$userId,'project_id'=>$project->id,'status'=>'pending','amount'=>$amount,'currency'=>'USD']);
  $stripe = new StripeClient(config('services.stripe.secret'));
  $session = $stripe->checkout->sessions->create([
   'mode'=>'payment',
   'line_items'=>[[ 'price_data'=>['currency'=>'usd','product_data'=>['name'=>"HD PDF export: {$project->name}"],'unit_amount'=>(int) round($amount*100)],'quantity'=>1]],
   'success_url'=>config('app.frontend_url').'/dashboard/downloads?session_id={CHECKOUT_SESSION_ID}',
   'cancel_url'=>config('app.frontend_url').'/editor/'.$project->id.'?checkout=cancelled',
   'metadata'=>['order_id'=>$order->id,'project_id'=>$project->id,'user_id'=>$userId],
  ]);
  $order->update(['meta'=>['stripe_session_id'=>$session->id]]);
  return ['order'=>$order,'checkout_url'=>$session->url];
 }
}
