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


class CourseModuleController extends Controller
{

    public function listModules(Request $request, $courseId=0){

        $courseModules = new \App\CourseModule;
        $q = $request->input("q", null);
        if($q){
            $courseModules = $courseModules->where("name", "LIKE", "%{$q}%");
        }
        return response($courseModules->get());
    }

    public function createCourseModule(Request $request, $courseId=0){
        $validator = Validator::make($request->all(), [
            'course_id' => ['required', 'integer'],
            'name' => ['required', 'string'],
            'video_link' => ['string'],
            'pdf' => ['mimes:pdf'],
        ]);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }



        $modulePdf = null;
        if ($request->hasFile('pdf')) {
            $status = true;
            $modulePdf = sprintf("%s.%s",time(), $request->file('pdf')->extension());
            $destinationPath = "assets/course";
            $request->file('pdf')->move($destinationPath, $modulePdf);
        }

        $createUpdateArr = [
            "course_id" => $request->input("course_id", 0),
            "name" => $request->input("name", ""),
            "video_url" => $request->input("video_url", ''),
            "status" => 0
        ];

        if($modulePdf){
            $createUpdateArr["pdf"] = $modulePdf;
        }
        if(!$request->input("id", null)){
            $createUpdateArr["sort_order"] = ( \App\CourseModule::max('sort_order') + 1);
        }

        $course = \App\Course::find($request->input("course_id"));

        if($course->user_id == Auth::id()){
            \App\CourseModule::updateOrCreate(
                [
                    "id" => $request->input("id", 0),
                ],
               $createUpdateArr
            );
            return response([
                'message' => 'successfully saved!', 'status' => 1
            ]);

        }else{
            return response([
                'message' => 'sorry unexpected error occur', 'status' => 0
            ]);

        }




    }

    public function deleteCourseModule(Request $request, $courseId=0){
        $courses = \App\CourseModule::find($request->input("id", 0))->delete();
        return response([
            'message' => 'successfully delete!', 'status' => 1
        ]);

    }
}
