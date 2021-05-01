<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;


class CouponsController extends Controller
{


    public function index(Request $request){
        $perpage = 20;
        $coupns = \App\Coupon::with(["couponGroup"])->paginate($perpage);
        return response($coupns);
    }


    public function store(Request $request){
        $validationArr = [
            'type' => ['required', 'string'],
            'no_use' => ['required', 'integer'],
            'value' => ['required', 'integer'],
            // 'start_date' => ['required', 'string'],
            // 'end_date' => ['required', 'string'],
            'status' => ['required', 'integer'],
        ];

        if($request->input("no_of_coupon", 0) > 1){
            $validationArr["groupName"] = ['required'];
        }else{
            $validationArr["code"] = [ 'unique:coupons,code,'.$request->input("id", 0)];
        }

        $validator = Validator::make($request->all(), $validationArr);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }

        $id = $request->input("id", 0);
        $no_of_coupon = $request->input("no_of_coupon", 1);
        $groupName = $request->input("groupName", '');
        $code = $request->input("code", '');
        $description = $request->input("description", '');
        $no_use = $request->input("no_use", 1);
        $type = $request->input("type", 1);
        $value = $request->input("value", 1);
        $start_date = $request->input("start_date", null);
        $end_date = $request->input("end_date", null);
        $status = $request->input("status", 1);
        $role_id = 2;
        $start_dateCar = null;
        $end_dateCar = null;
        if($start_date)
            $start_dateCar = \Carbon\Carbon::createFromDate($start_date["year"], $start_date["month"], $start_date["day"])->format('Y-m-d h:i:s');
        $end_date = $request->input("end_date", null);
        if($end_date)
            $end_dateCar = \Carbon\Carbon::createFromDate($end_date["year"], $end_date["month"], $end_date["day"])->format('Y-m-d h:i:s');

        if(!$code){
            $code = $this->generateRandomString(6);
        }



        if($id){
            $coupon = \App\Coupon::find($id);
            $coupon->description = $description;
            $coupon->code = $code;
            $coupon->no_use = $no_use;
            $coupon->type = $type;
            $coupon->value = $value;
            $coupon->start_date = $start_dateCar;
            $coupon->end_date = $end_dateCar;
            $coupon->status = $status;
            $coupon->save();

        }else{
            while(\App\Coupon::where("code", $code)->exists()){
                $code = $this->generateRandomString(6);
            }

            $couponGroup = new \App\CouponGroup;
            $couponGroup->name = $groupName;
            $couponGroup->no_of_coupon = $no_of_coupon;
            $couponGroup->save();
            //$couponGroup->refresh();
            if($couponGroup){
                for($i=1; $i <= $no_of_coupon; $i++){



                    $couponGroup->coupon()->save(new \App\Coupon([
                        "role_id" => $role_id,
                        "coupon_group_id" =>$couponGroup->id,
                        "code" => $code,
                        "description" => $description,
                        "no_use" => $no_use,
                        "type" => $type ,
                        "value" => $value,
                        "start_date" => $start_dateCar,
                        "end_date" => $end_dateCar,
                        "status" => $status
                    ]));
                    $code = $this->generateRandomString(6);
                    while(\App\Coupon::where("code", $code)->exists()){
                        $code = $this->generateRandomString(6);
                    }
                }

            }
        }

        return response([
            'message' => ($id) ?  'successfully updated' : 'successfully created',
            'status' => 1
        ]);

    }

    public function getCoupon($id=0){
        $coupon = \App\Coupon::with(["couponGroup"])->find($id);
        return response($coupon);
    }

    public function validateCoupon(Request $request){
        $code = $request->input("code", '');
        $coupon = \App\Coupon::where("code", $code)
        ->where("status", 1)
        ->withCount("couponTrack")
        ->where(function ($query) {
            $query->whereNull("start_date")->orWhereDate('start_date', '>=',  \Carbon\Carbon::now());
        })
        ->where(function ($query) {
            $query->whereNull("end_date")
            ->orWhereDate('end_date', '<=',  \Carbon\Carbon::now());
        })
        ->havingRaw('coupon_track_count < no_use')->get()->first();
        if($coupon && $coupon->count()){
            return response($coupon);
        }else{
            return response(['message' => 'Invalid Coupon', 'status' => false], 422);
        }
    }

    private  function generateRandomString($length = 20) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }



}
