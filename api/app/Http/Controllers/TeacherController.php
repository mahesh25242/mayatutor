<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\UserResource;
use App\User;
use Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Image;
use Illuminate\Support\Facades\Storage;
use App\Mail\ReportAbuseMail;
use App\Http\Resources\UserCollection;
use Mail;
use Carbon\Carbon;

class TeacherController extends Controller
{

    public function search($q='', Request $request){
        $perPage = 50;
        $user = \App\User::withCount("teacherStudent as student_count")->with(["rating", "teacherInfo", "subject", "city"])->whereHas("userRole", function ($qry){
            $qry->where("role_id", 2);
        });
        if($q){
            $user = $user->whereHas("course.courseTag",function($qry) use($q){
                $qry->where("tag_name", 'like', "%{$q}%");
            });
        }


        $details["q"] = $q;
        $details["place"] = $request->input("place",'');
        $details["phone"] = $request->input("phone",'');

        $emailJob = (new \App\Jobs\SendSearchEmailJob($details))->delay(Carbon::now()->addSeconds(2));
        dispatch($emailJob);

        $paginator = $user->paginate($perPage);





        //$paginator->setCollection($paginator->getCollection()->makeHidden(['email', 'phone']));
        return response(new UserCollection($paginator));
    }

    public function teacher($url =''){
        $user = \App\User::withCount("teacherStudent as student_count")
        ->with(["rating", "teacherInfo", "subject", "city", "country", "state",
         "teacherBanner","teacherPaymentInfo", "currentUserPlan"])->whereHas("userRole", function ($qry){
            $qry->where("role_id", 2);
        })->where("url", $url)->get()->first();

        return response(new UserResource($user) );
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

            $userId = 0;
            if($request->input("id", null) && Auth::user()->isAdmin()->exists()){
                $userId = ($request->input("id", null)) ? $request->input("id", null) : Auth::id();
            }else{
                $userId = Auth::id();
            }
            $teacherBanner = \App\TeacherBanner::updateOrCreate(
                [
                    "user_id" => $userId,
                ],
                [
                    "user_id" => $userId,
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
                'qr_code1' => 'max:1024',
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
                'qr_code2' => 'max:1024',
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


            //$img = Image::make($destinationPath.'/'.$qrCodeImg);//->resize(1700, 200);
            //$img->save($destinationPath.'/'.$qrCodeImg, 60);

            if($request->input("id", null) && Auth::user()->isAdmin()->exists()){
                $userId = ($request->input("id", null)) ? $request->input("id", null) : Auth::id();
            }else{
                $userId = Auth::id();
            }
            $teacherPaymentInfo = \App\TeacherPaymentInfo::updateOrCreate(
                [
                    "user_id" => $userId,
                ],
                [
                    "user_id" => $userId,
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

    public function reportAbuse(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string'],
            'info' =>  ['required', 'string']
        ]);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }

        $reportAbuse = new \App\ReportAbuse;
        $reportAbuse->user_id = $request->input("user_id", 0);
        $reportAbuse->info = $request->input("info", '');
        $reportAbuse->reported_by = (Auth::id()) ? Auth::id() : 0;
        $reportAbuse->reported_by_name = $request->input("name", '');
        $reportAbuse->save();

        $user = User::find($request->input("user_id", 0));
        $dtails = [
            "reportedBy" => $request->input("name", ''),
            "info" => $request->input("info", '')
        ];

        $settings = \App\Setting::where("name", "contactMail")->get()->first();
        if($settings && $settings->value){
             Mail::to($settings->value)->send(new ReportAbuseMail($user,  $dtails));
        }


        return response([
            'message' => 'successfully reported!', 'status' => 1
        ]);
    }
    public function invoices($userId = 0){
        $userId = ($userId) ? $userId : Auth::id();
        return response(\App\UserPlan::with(["plan"])->where("user_id", $userId)->latest()->get());
    }

    public function downloadInvoice($invId = 0){
        if(file_exists(public_path("assets/invoices/{$invId}.pdf"))){
            return response()->download(public_path("assets/invoices/{$invId}.pdf"));
        }
        return response([
            'message' => '404', 'status' => 0
        ], 404);
    }
}

