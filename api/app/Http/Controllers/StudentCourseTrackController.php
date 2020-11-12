<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

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


        $studentCourseModuleTrack = \App\StudentCourseModuleTrack::updateOrCreate(
            [
                "course_module_id" => $request->input("module_id", 0),
                "student_course_track_id" => $studentCourseTrack->id
            ],
            [
                "course_module_id" => $request->input("module_id", 0),
                "student_course_track_id" => $studentCourseTrack->id,
                "status" => 0
            ]
        );

        return $studentCourseModuleTrack;
        if(! $studentCourseModuleTrack->wasChanged()){
            $studentCourseModuleTrack->touch();
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

        return response(['message' => 'Successfully completed the module', 'status' => true]);
    }

}
