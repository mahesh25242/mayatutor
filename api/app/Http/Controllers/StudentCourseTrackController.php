<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\Events\CourseModuleEvent;
class StudentCourseTrackController extends Controller
{


    public function launchModule(Request $request){

        $studentCourseTrack = \App\StudentCourseTrack::updateOrCreate(
            [
                "student_course_id" => $request->input("id", 0),
            ],
            [
                "course_id" => $request->input("id", 0),
            ]
        );


        $studentCourseModuleTrack = \App\StudentCourseModuleTrack::where("course_module_id", $request->input("module_id", 0))
        ->where("student_course_track_id", $studentCourseTrack->id)->get()->first();
        if($studentCourseModuleTrack ){
            if(!$studentCourseModuleTrack->status){
                $studentCourseModuleTrack->touch();
            }
        }else{
            $studentCourseModuleTrack = new \App\StudentCourseModuleTrack;
            $studentCourseModuleTrack->course_module_id = $request->input("module_id", 0);
            $studentCourseModuleTrack->student_course_track_id = $studentCourseTrack->id;
            $studentCourseModuleTrack->status = 0;
            $studentCourseModuleTrack->save();
        }



        return response(['message' => 'Successfully started module', 'status' => true]);
    }


    public function markAsFinished(Request $request){
        $studentCourse = \App\StudentCourse::find($request->input("id", 0));
        $studentCourseModuleTrack = \App\StudentCourseModuleTrack::where("student_course_track_id", $studentCourse->studentCourseTrack->id)
        ->where("course_module_id", $request->input("module_id", 0))
        ->get()->first();
        $studentCourseModuleTrack->status = 1;
        $studentCourseModuleTrack->save();

        event(new CourseModuleEvent($studentCourseModuleTrack));
        return response(['message' => 'Successfully completed the module', 'status' => true]);
    }

    public function fetchNextModule(Request $request)
    {
        $courseModule = \App\CourseModule::find( $request->input("module_id", 0));

        if($courseModule){
            $nextModule =  \App\CourseModule::where("course_id", $courseModule->course_id)
            ->where("sort_order", ">", $courseModule->sort_order)->orderBy("sort_order", "ASC")->take(1)->first();
            return response($nextModule);
        }else{
            return response(['message' => 'no module found', 'status' => false], 422);
        }



    }

}
