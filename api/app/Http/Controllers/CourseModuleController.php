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
use App\Http\Resources\CourseModuleResource;

class CourseModuleController extends Controller
{

    public function listModules(Request $request, $courseId=0){

        $courseModules = new \App\CourseModule;
        $q = $request->input("q", null);
        if($q){
            $courseModules = $courseModules->where("name", "LIKE", "%{$q}%");
        }
        if($courseId){
            $courseModules = $courseModules->where("course_id", $courseId);
        }


        return response($courseModules->orderBy("sort_order", "ASC")->get());
    }

    public function createCourseModule(Request $request, $courseId=0){
        $validator = Validator::make($request->all(), [
            'course_id' => ['required', 'integer'],
            'name' => ['required', 'string'],
            'video_type' => ['required', 'string'],
            'video_url' => ['required_without:pdf', 'string'],
            'pdf' => ['required_without:video_url'], //mimes:pdf
        ]);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }



        $modulePdf = $request->input("pdf", null);
        // if ($request->hasFile('pdf')) {
        //     $status = true;
        //     $modulePdf = sprintf("%s.%s",time(), $request->file('pdf')->extension());
        //     $destinationPath = "assets/course/".$request->input("course_id", 0);
        //     $request->file('pdf')->move($destinationPath, $modulePdf);
        // }

        $createUpdateArr = [
            "course_id" => $request->input("course_id", 0),
            "name" => $request->input("name", ""),
            "video_url" => $request->input("video_url", ''),
            "video_type" => $request->input("video_type", ''),
            "file1" => $request->input("file1", ''),
            "file2" => $request->input("file2", ''),
            "status" => 0
        ];

        if($modulePdf){
            $createUpdateArr["pdf"] = $modulePdf;
        }
        if(!$request->input("id", null)){
            $createUpdateArr["sort_order"] = ( \App\CourseModule::where("course_id", $courseId)->max('sort_order') + 1);
            if(!$createUpdateArr["sort_order"])
                $createUpdateArr["sort_order"] = 1;
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

    public function orderCourseModule(Request $request, $courseId=0){
        $modules = $request->all();
        if(is_array($modules) && !empty($modules)){
            foreach($modules as $module){
                $cousreModule = \App\CourseModule::where("id", $module["id"])->where("course_id", $courseId)->get()->first();
                if($cousreModule){
                    $cousreModule->sort_order = $module["sort_order"];
                    $cousreModule->save();
                }
            }
        }
        return response([
            'message' => 'successfully reordered!', 'status' => 1
        ]);
    }

    public function getAModule($courseId =0,$id = 0){
        $module = \App\CourseModule::with(["course.user", "course.courseTag",
         "loggedStudentCourse.studentCourseTrack.studentCourseModuleTrack",
         "isModuleCompleted" ])->withCount("isModuleCompleted")->find($id);

        return response(new CourseModuleResource($module));
    }

    public function isLaunchable($id=0, $moduleId = 0){
        $module = \App\CourseModule::whereHas("course", function($q){
            $q->where(function($query) {
                $query->orWhere("user_id", Auth::id())
                ->orWhereHas("studentCourse", function($qry){
                    $qry->where("user_id", Auth::id());
                });
            });

        })->find($moduleId);

        if($module){
            return $module;
        }else{
            return response(['message' => 'Validation errors', 'status' => false], 422);
        }


    }
}
