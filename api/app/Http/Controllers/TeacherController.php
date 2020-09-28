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


class TeacherController extends Controller
{

    public function search($q=''){
        return response([
            'message' => 'successfully updated!', 'status' => 1
        ]);
    }

    public function changeBanner(Request $request){
        $status = false;
        if ($request->hasFile('img')) {
            $status = true;
            $bannerName = sprintf("%s.%s",time(), $request->file('img')->extension());
            $destinationPath = "assets/banner";
            $request->file('img')->move($destinationPath, $bannerName);


            $img = Image::make($destinationPath.'/'.$bannerName);//->resize(1700, 200);
            $img->save($destinationPath.'/'.$bannerName, 60);
            $teacherBanner = \App\TeacherBanner::updateOrCreate(
                [
                    "user_id" => Auth::id(),
                ],
                [
                    "user_id" => Auth::id(),
                    "img" => $bannerName
                ]
            );

            return response([
                'message' => 'successfully updated!', 'status' => $status
            ]);
        }else{
            return response([
                'message' => 'sorry file not uploaded!', 'status' => $status
            ], 421);
        }
    }

    public function topRatedTeacher(Request $request){
        $teachers = \App\Rating::whereHas("user.role", function($q){
            $q->where("roles.id" , 2);
        })->with(["user.rating", "user.teacherInfo", "user.subject", "user.city"])->orderBy("rate", "DESC")
        ->orderBy("tot_users", "DESC")->get();
        return response($teachers);
    }

    public function updatePaymentQRCode(Request $request){




        $postFlName = '';
        if($request->hasFile('qr_code1')){
            $postFlName = 'qr_code1';
            $validator = Validator::make($request->all(), [
               // 'qr_code1' => ['dimensions:max_width=100,max_height=200', 'image'],
            ],[],[
                'qr_code1' => 'QR Code 1',
            ]);


            if($validator->fails()){
                return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
            }

        }else if($request->hasFile('qr_code2')){
            $postFlName = 'qr_code2';
            $validator = Validator::make($request->all(), [
              //  'qr_code2' => ['dimensions:max_width=100,max_height=200', 'image'],
            ],[],[
                'qr_code2' => 'QR Code 2',
            ]);


            if($validator->fails()){
                return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
            }

        }

        if ($postFlName && $request->hasFile($postFlName)) {
            $status = true;
            $qrCodeImg = sprintf("%s.%s",time(), $request->file($postFlName)->extension());
            $destinationPath = "assets/teacher";
            $request->file($postFlName)->move($destinationPath, $qrCodeImg);


            $img = Image::make($destinationPath.'/'.$qrCodeImg);//->resize(1700, 200);
            $img->save($destinationPath.'/'.$qrCodeImg, 60);
            $teacherPaymentInfo = \App\TeacherPaymentInfo::updateOrCreate(
                [
                    "user_id" => Auth::id(),
                ],
                [
                    "user_id" => Auth::id(),
                    $postFlName => $qrCodeImg
                ]
            );
            return response([
                'message' => 'successfully updated!', 'status' => 1
            ]);
        }else{
            return response([
                'message' => 'sorry unexpected error occur', 'status' => 0
            ]);
        }
    }
}
