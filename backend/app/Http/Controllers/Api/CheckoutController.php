<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Project;
use App\Services\Payment\StripeCheckoutService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class CheckoutController extends Controller {
 public function __construct(private readonly StripeCheckoutService $stripe) {}
 public function createIntent(Request $request): JsonResponse { $request->validate(['project_id'=>['required','integer','exists:projects,id']]); $project = Project::findOrFail($request->integer('project_id')); $this->authorize('view',$project); return response()->json($this->stripe->createCheckout($project, $request->user()->id)); }
 public function webhook(Request $request): JsonResponse { if ($request->input('type') === 'checkout.session.completed') { $metadata = $request->input('data.object.metadata', []); $order = Order::find($metadata['order_id'] ?? null); if ($order) { $order->update(['status'=>'paid']); Payment::create(['order_id'=>$order->id,'provider'=>'stripe','provider_payment_id'=>$request->input('data.object.payment_intent'),'status'=>'paid','amount'=>$order->amount,'currency'=>$order->currency,'payload'=>$request->all()]); } } return response()->json(['received'=>true]); }
}
