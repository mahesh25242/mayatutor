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
use App\Http\Resources\CourseCollection;
use App\Http\Resources\CourseResource;

class CourseController extends Controller
{

    public function listTeacherCourses(Request $request){
        $perPage = 20;
        $courses = \App\Course::withCount(["courseModule"])->with(["user.rating", "courseTag", "latestCourseApprovalRequest"]);
        if($request->input("url", null)){
            $courses = $courses->whereHas("user", function($q) use($request) {
                $q->where("url", $request->input("url",null));
            })->where("status", 1);
        }else{
            $courses = $courses->where("user_id", Auth::id());
        }

        $q = $request->input("q", null);
        if($q){
            $courses = $courses->where("name", "LIKE", "%{$q}%");
        }
        return response(new CourseCollection($courses->paginate($perPage)));
    }

    public function createCourse(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string'],
            'price' => ['integer'],
            'demo_video_url' => ['string'],
            'description' => ['string'],
            //'image'=> ['image'],
            'live_class_url'=> ['string'],
            'news'=> ['string'],
        ]);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }

        $courseImage = null;
        if ($request->hasFile('image')) {
            $status = true;
            $courseImage = sprintf("%s.%s",time(), $request->file('image')->extension());
            $destinationPath = "assets/course";
            $request->file('image')->move($destinationPath, $courseImage);


            $img = Image::make($destinationPath.'/'.$courseImage);//->resize(126, 139);
            $img->save($destinationPath.'/'.$courseImage, 60);

        }

        $user = \App\User::withCount("teacherAutoApproval")->find(Auth::id());

        $createUpdateArr = [
            "user_id" => Auth::id(),
            "name" => $request->input("name", ""),
            "price" => $request->input("price", null),
            "demo_video_url" => $request->input("demo_video_url", ""),
            "description" => $request->input("description", ""),
            "status" => 1,
            "live_class" => $request->input("live_class", 0),
            "live_class_url" => $request->input("live_class_url", ""),
            "news" => $request->input("news", "")

        ];



        if($courseImage){
            $createUpdateArr["image"] = $courseImage;
        }

        $course = \App\Course::updateOrCreate(
            [
                "id" => $request->input("id", 0),
                "user_id" => Auth::id()
            ],
           $createUpdateArr
        );




        if($request->input("tag_name", null)){
            $tag_names = json_decode($request->input("tag_name", null));
            $exceptTagNames = array();
            foreach($tag_names as $tag_name){
                if($tag_name->tag_name){
                    $exceptTagNames[] = $tag_name->tag_name;
                    $course->courseTag()->updateOrCreate(
                       [
                           "course_id" => $course->id,
                           "tag_name" => $tag_name->tag_name
                       ],
                       [
                        "course_id" => $course->id,
                        "tag_name" => $tag_name->tag_name
                       ]
                   );
                }

            }
            $course->courseTag()->whereNotIn("tag_name", $exceptTagNames)->delete();
        }


        return response([
            'message' => 'successfully updated!', 'status' => 1
        ]);

    }

    public function course($courseId = 0){
        $course = \App\Course::with(["courseTag", "courseModule", "user" => function($query){
            $query->withCount(["teacherAutoApproval"]);
        }, "latestCourseApprovalRequest"])->find($courseId);
        return response(new CourseResource($course));
    }

    public function deleteCourse(Request $request){
        $courses = \App\Course::find($request->input("id", 0))->delete();
        return response([
            'message' => 'successfully delete!', 'status' => 1
        ]);

    }

    public function listAllCourses(Request $request){

//        $isAdmin = \App\User::has("isAdmin")->find(Auth::id());
        $perPage = 20;
        $courses = \App\Course::withCount(["courseModule"])->with(["user.rating", "latestCourseApprovalRequest"]);
        $q = $request->input("q", null);
        if($q){
            $courses = $courses->where("name", "LIKE", "%{$q}%");
        }
        return response($courses->paginate($perPage));
    }

    public function approveCourse(Request $request){
        $courseApprovalRequest = \App\CourseApprovalRequest::find($request->input("id", 0));
        if($courseApprovalRequest){
            $courseApprovalRequest->status = $request->input("status", 0);
            $courseApprovalRequest->message = ($courseApprovalRequest->status ==1 ) ? '' :$request->input("message", '');
            $courseApprovalRequest->save();
            return response([
                'message' => 'successfully approved!', 'status' => true
            ]);
        }else{
            return response([
                'message' => 'sorry request not found', 'status' => false
            ], 422);
        }
    }


}
