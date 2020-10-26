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
        $perPage = 20;
        $user = \App\User::withCount("teacherStudent as student_count")->with(["rating", "teacherInfo", "subject", "city"])->whereHas("userRole", function ($qry){
            $qry->where("role_id", 2);
        });
        if($q){
            $user = $user->whereHas("course.courseTag",function($qry) use($q){
                $qry->where("tag_name", 'like', "%{$q}%");
            });
        }
        return response($user->paginate($perPage));
    }

    public function teacher($url =''){
        $user = \App\User::withCount("teacherStudent as student_count")->with(["rating", "teacherInfo", "subject", "city"])->whereHas("userRole", function ($qry){
            $qry->where("role_id", 2);
        })->where("url", $url)->get()->first();

        return response($user);
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

    public function toggleAutoApproval(Request $request){
        $teacherAutoApproval = \App\TeacherAutoApproval::where("user_id", $request->input("id", 0))
        ->get()->first();

        if($teacherAutoApproval){
            $teacherAutoApproval->delete();
        }else{
            $teacherAutoApproval = new \App\TeacherAutoApproval;
            $teacherAutoApproval->user_id = $request->input("id", 0);
            $teacherAutoApproval->save();
        }

        return response([
            'message' => 'successfully updated!', 'status' => 1
        ]);
    }

    public function addStudent(Request $request){
        $co = $request->input("course", null);
        $phone = $request->input("phone", null);

        $validator = Validator::make($request->all(), [
            'phone' => ['required'],
         ],[],[
             'phone' => 'Mobile / Email',
         ]);


         if($validator->fails()){
             return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
         }

        $course = \App\Course::find($co["id"]);
        if(is_array($phone) && !empty($phone)){
            foreach( $phone as $usr){
                $user = \App\User::find($usr["id"]);
                if($user){
                    $teacherStudent = \App\TeacherStudent::updateOrCreate(
                        [
                            "teacher_user_id" => Auth::id(),
                            "user_id" => $user->id
                        ],
                        [
                            "teacher_user_id" => Auth::id(),
                            "user_id" => $user->id,
                            "status" => 1
                        ]
                    );
                    if($course && $teacherStudent){
                        \App\StudentCourse::updateOrCreate(
                            [
                                "user_id" => $user->id,
                                "course_id" => $course->id
                            ],
                            [
                                "user_id" => $user->id,
                                "course_id" => $course->id,
                                "status" => 1
                            ]
                        );
                    }
                }
            }
            return response([
                'message' => 'successfully added student!', 'status' => 1
            ]);
        }

    }
}
