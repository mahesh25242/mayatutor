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


class CourseController extends Controller
{

    public function listCourses(Request $request){

        $courses = \App\Course::withCount(["courseModule"]);
        $q = $request->input("q", null);
        if($q){
            $courses = $courses->where("name", "LIKE", "%{$q}%");
        }
        return response($courses->get());
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

        $createUpdateArr = [
            "user_id" => Auth::id(),
            "name" => $request->input("name", ""),
            "price" => $request->input("price", null),
            "demo_video_url" => $request->input("demo_video_url", ""),
            "description" => $request->input("description", ""),
            "status" => 0,
            "live_class" => $request->input("live_class", 0),
            "live_class_url" => $request->input("live_class_url", ""),
            "news" => $request->input("news", "")

        ];

        if($courseImage){
            $createUpdateArr["image"] = $courseImage;
        }

        \App\Course::updateOrCreate(
            [
                "id" => $request->input("id", 0),
                "user_id" => Auth::id()
            ],
           $createUpdateArr
        );


        return response([
            'message' => 'successfully updated!', 'status' => 1
        ]);

    }

    public function course($courseId = 0){
        $course = \App\Course::find($courseId);
        return response($course);
    }

    public function deleteCourse(Request $request){
        $courses = \App\Course::find($request->input("id", 0))->delete();
        return response([
            'message' => 'successfully delete!', 'status' => 1
        ]);

    }
}
