<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class StudentCourseTrackController extends Controller
{


    public function launchModule(Request $request){
        $studentCourseModuleTrack = \App\StudentCourseModuleTrack::updateOrCreate(
            [
                'course_module_id' => $request->input("id", 0)
            ],
            [
                'course_module_id' => $request->input("id", 0),
                'status' => 0
            ]
        );

        if(! $studentCourseModuleTrack->wasChanged()){
            $studentCourseModuleTrack->touch();
        }

        return response(['message' => 'Successfully started module', 'status' => true]);
    }


    public function markAsFinished(Request $request){
        $studentCourseModuleTrack = \App\StudentCourseModuleTrack::where("course_module_id", $request->input("id", 0))
        ->whereHas("studentCourseTrack", function($query){
            $query->where("user_id", Auth::id());
        })->get()->first();
        $studentCourseModuleTrack->status = 1;
        $studentCourseModuleTrack->save();

        return response(['message' => 'Successfully completed the module', 'status' => true]);
    }

}
