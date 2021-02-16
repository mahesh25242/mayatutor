<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;
use Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Image;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;


class UserPaymentController extends Controller
{

    public function studentPaymentByCourse(Request $request){
        $userPayment = \App\UserPayment::where("course_id", $request->input("course_id", 0));
        return response($userPayment->get());
    }


    public function createStudentPaymentByCourse(Request $request){
        $validator = Validator::make($request->all(), [
            'course_id' => ['required'],
            'amount' => ['required'],
            'method' => ['required'],
            'user_id' => ['required'],
        ]);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
        $courseExists = \App\Course::where("id", $request->input("course_id", 0))->where("user_id", Auth::id())->exists();
        if(!$courseExists){
            return response(['message' => 'Sorry course not found',  'status' => false], 422);
        }
        $start_dateCar = NULL;
        $end_dateCar = NULL;
        $start_date = $request->input("start_date", null);
        if($start_date)
            $start_dateCar = Carbon::createFromDate($start_date["year"], $start_date["month"], $start_date["day"])->format('Y-m-d h:i:s');
        $end_date = $request->input("end_date", null);
        if($end_date)
            $end_dateCar = Carbon::createFromDate($end_date["year"], $end_date["month"], $end_date["day"])->format('Y-m-d h:i:s');

        $userPayment = new \App\UserPayment;
        $userPayment->user_id = $request->input("user_id", 0);
        $userPayment->course_id = $request->input("course_id", 0);
        $userPayment->amount = $request->input("amount", 0);
        $userPayment->method = $request->input("method", 0);
        $userPayment->start_date = $start_dateCar;
        $userPayment->end_date = $end_dateCar;
        $userPayment->save();

        return response(['message' => 'Successfully saved',  'status' => true]);
    }


}
