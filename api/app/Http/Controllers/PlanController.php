<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Events\PlanPurchaseEvent;
use App\Http\Resources\PlanPurchaseResource;
use DB;

class PlanController extends Controller
{


    public function plans(Request $request){
        $plans = \App\Plan::with(["myUserPlan"])->get();
        return response($plans);
    }


    public function plan($id){

        $plan = \App\Plan::with(["myUserPlan"])->find($id);
        $plan->gst = \App\Setting::where("name", "GST")->get()->first();
        $plan->gstPrice = $plan->price + ((double) $plan->price * ( (double) $plan->gst->value / 100));
        return response($plan);
    }


    public function planPurchase(Request $request){
        $coupon = $request->input("coupon", null);
        $plan = $request->input("plan", null);
        $plan = ($plan) ? $plan : 0;
        if($coupon){
            $coupon = \App\Coupon::withCount("couponTrack")
            ->where(function ($query) {
                $query->whereNull("start_date")->orWhereDate('start_date', '<=',  \Carbon\Carbon::now());
            })
            ->where(function ($query) {
                $query->whereNull("end_date")
                ->orWhereDate('end_date', '>=',  \Carbon\Carbon::now());
            })->where("id", $coupon)
            ->where("status", 1)
            ->havingRaw('coupon_track_count < no_use')->get()->first();
        }

        if($plan){
            $plan = \App\Plan::find($plan);
        }

        if(!$plan || $plan->basic){
            return response([
                "success" => false,
                "message" => 'You can\'t purchase basic plan again'
            ], 422);
        }

        //if(!Auth::user()->currentUserPlan || (Auth::user()->currentUserPlan && Auth::user()->currentUserPlan->remaining_days <= 5)){

            $discount = 0;
            if($coupon && $coupon->id){
                switch($coupon->type){
                    case '%':
                        $discount = ($plan->price * ($coupon->value / 100));
                    break;
                    default:
                        $discount = $coupon->value;
                    break;
                }

                $discount = ($discount > $plan->price)  ? $plan->price : $discount;
            }

            $total = $plan->price - $discount;

            //GST
            $gst = \App\Setting::where("name", "GST")->get()->first();
            $gstPercentage = $gst->value;
            $gstPercentage = ($gstPercentage) ? (double) $gstPercentage : 0;

            $taxAmt = $total * ($gstPercentage  / 100);
            $total = $total + $taxAmt;

             // UserPlan
             $planPurchase = new \App\PlanPurchase;
             $planPurchase->user_id = Auth::user()->id;
             $planPurchase->plan_id = $plan->id;
             $planPurchase->amount = $total;
             $planPurchase->discount = $discount;
             $planPurchase->status = ($total) ? 0 : 1;
             $planPurchase->tax = $taxAmt;


            //  if($event->payment){
            //      $planPurchase->tran_no = $event->payment["tran_no"];
            //      $planPurchase->log = $event->payment["log"];
            //  }
             $planPurchase->save();



            if($total){
                $appId = env('CACH_FREE_GATEWAY_APP_ID', '');
                $appSecreat = env('CACH_FREE_GATEWAY_SECRET_KEY', '');

                $appEnv = env('APP_ENV', 'production');
                $url = 'https://api.cashfree.com/';

                if($appEnv != "production"){
                    $url = 'https://test.cashfree.com/';
                    $returnUrl = "http://localhost/mayatutor/api/public/v1/paymentSuccess";
                }else{
                    $returnUrl = "https://api.mayatutors.com/public/v1/paymentSuccess";
                }



                $gateWayPost = array('appId' => $appId,
                            'secretKey' => $appSecreat,
                            'orderId' => "MT_".$planPurchase->id.'_'.env('APP_ENV', 'production'),
                            'orderAmount' => $total,
                            'orderCurrency' => 'INR',
                            'orderNote' => sprintf("%s purchse of %s ( Email: %s, Phone: %s )", $plan->name, $planPurchase->user->fname, $planPurchase->user->email, $planPurchase->user->phone),
                            'customerEmail' => $planPurchase->user->email,
                            'customerName' => $planPurchase->user->fname,
                            'customerPhone' => $planPurchase->user->phone,
                            'returnUrl' =>  $returnUrl,
                            'notifyUrl' =>  $returnUrl."/notification"
                        );


                $client = new \GuzzleHttp\Client();
                try{
                    $response = $client->request('POST', "{$url}api/v1/order/create", [
                        'form_params' => $gateWayPost
                    ]);

                    $statusCode = $response->getStatusCode();
                    $content = $response->getBody()->getContents();
                    $resp  =json_decode($content );

                    $gateWayPost["res"] = $resp;
                    $planPurchase->gateway_request = json_encode($gateWayPost);
                    $planPurchase->save();

                    switch($statusCode){
                        case 200:
                            return response([
                                "success" => true,
                                "message" => "success",
                                "paymentLink" => $resp->paymentLink
                            ]);
                        break;
                        default:

                            return response([
                                "success" => false,
                                "message" => $content
                            ], 422);
                        break;
                    }
                } catch (Guzzle\Http\Exception\BadResponseException $e) {
                    echo 'Uh oh! ' . $e->getMessage();
                }




            }else{
                event(new PlanPurchaseEvent($planPurchase));
                return response([
                    "success" => true,
                    "message" => 'successfully purchased.'
                ]);
            }

        // }else{
        //     return response([
        //         "success" => false,
        //         "message" => 'sorry you have an active plan'
        //     ], 422);
        // }


    }

    public function paymentSuccess($notification=null, Request $request){
        $appSecreat = env('CACH_FREE_GATEWAY_SECRET_KEY', '');

        $orderId = $request->input("orderId", '');
        $orderAmount = $request->input("orderAmount", '');
        $referenceId = $request->input("referenceId", '');
        $txStatus = $request->input("txStatus", '');
        $paymentMode = $request->input("paymentMode", '');
        $txMsg = $request->input("txMsg", '');
        $txTime = $request->input("txTime", '');
        $signature = $request->input("signature", '');
        //$orderId = ($orderId && is_numeric($orderId)) ? $orderId : 0;

        $data = $orderId.$orderAmount.$referenceId.$txStatus.$paymentMode.$txMsg.$txTime;
        $hash_hmac = hash_hmac('sha256', $data, $appSecreat, true) ;
        $computedSignature = base64_encode($hash_hmac);
        $redirectUrl = env('PAYMENT_SUCCESS_REDIRECTION_URL')."failer";
        //md5("mks".$planPurchase->id)
        $purTail = '_'.env('APP_ENV', 'production');
        $planPurchase = \App\PlanPurchase::where(DB::raw('CONCAT("MT_",id, "'.$purTail.'")') , $orderId)->get()->first();

        if($planPurchase){
            $planPurchase->gateway_response = json_encode($request->all());
            $planPurchase->save();

            if ($txStatus == 'SUCCESS' && $signature == $computedSignature) {


                if(!$planPurchase->status){
                    $planPurchase->status = 1;
                    $planPurchase->tran_no = $referenceId;
                    $planPurchase->save();
                    event(new PlanPurchaseEvent($planPurchase));
                }
                $redirectUrl = env('PAYMENT_SUCCESS_REDIRECTION_URL')."success/{$orderId}";
                if(!$notification){
                    return redirect($redirectUrl);
                }else{
                    return response([
                        "success" => true,
                        "message" => 'Success'
                    ]);
                }
            }else {
                if(!$notification){
                    return redirect($redirectUrl);
                }else{
                    return response([
                        "success" => false,
                        "message" => 'Signature verification faild'
                    ]);
                }
            }
        }else{
            return response([
                        "success" => false,
                        "message" => 'no order found'
                    ], 404);
        }
    }
    public function payment($id){
        $purTail = '_'.env('APP_ENV', 'production');
        $planPurchase = \App\PlanPurchase::with(["user", "plan", "userPlan"])->where(DB::raw('CONCAT("MT_",id, "'.$purTail.'")') , $id)->where("user_id", Auth::id())->get()->first();
        if($planPurchase){
            return new PlanPurchaseResource($planPurchase);
        }else{
            return response([
                "success" => false,
                "message" => 'no order found'
            ], 404);
        }
    }

    public function purchases(Request $request){
        $perPage = 50;
        $planPurchase = \App\PlanPurchase::with(["user", "plan", "userPlan"]);

        return response($planPurchase->where("status", 1)->latest()->paginate($perPage));
    }
}
