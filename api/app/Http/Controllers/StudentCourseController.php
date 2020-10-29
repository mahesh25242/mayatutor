<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudentCourseController extends Controller
{



    public function toggleCourse(Request $request){
        $studentCourse = \App\StudentCourse::find($request->input("id"));
        if($studentCourse){
            $studentCourse->status =  !$studentCourse->status;
            $studentCourse->save();
        }

        return response($studentCourse);
    }

    public function studentCourse(Request $request){
        $studentCourse = \App\StudentCourse::with(["course"])
        ->where("user_id", $request->input("id", 0))
        ->whereHas("course" , function($query){
            $query->where("user_id", Auth::id());
        })->get();

        return response($studentCourse);
    }





}
