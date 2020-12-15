<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Events\PlanPurchaseEvent;

class PlanController extends Controller
{


    public function plans(Request $request){
        $plans = \App\Plan::with(["myUserPlan"])->get();
        return response($plans);
    }


    public function plan($id){
        $plan = \App\Plan::with(["myUserPlan"])->find($id);
        return response($plan);
    }


    public function planPurchase(Request $request){
        $coupon = $request->input("coupon", null);
        $plan = $request->input("plan", null);
        $plan = ($plan) ? $plan : 0;
        if($coupon){
            $coupon = \App\Coupon::withCount("couponTrack")
            ->where(function ($query) {
                $query->whereNull("start_date")->orWhereDate('start_date', '>=',  \Carbon\Carbon::now());
            })
            ->where(function ($query) {
                $query->whereNull("end_date")
                ->orWhereDate('end_date', '<=',  \Carbon\Carbon::now());
            })->where("id", $coupon)
            ->where("status", 1)
            ->havingRaw('coupon_track_count < no_use')->get()->first();
        }

        if($plan){
            $plan = \App\Plan::find($plan);
        }


        if(!Auth::user()->currentUserPlan || (Auth::user()->currentUserPlan && Auth::user()->currentUserPlan->remaining_days <= 5)){
            event(new PlanPurchaseEvent($plan, $coupon, Auth::user()));
            return response([
                "success" => true,
                "message" => 'successfully purchased.'
            ]);
        }else{
            return response([
                "success" => false,
                "message" => 'sorry you have an active plan'
            ], 422);
        }


    }
}
