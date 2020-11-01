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

        return response(["message" => 'Successfully changed status', "status" => true]);
    }

    public function deleteCourse(Request $request){
        $studentCourse = \App\StudentCourse::find($request->input("id"))->delete();;

        return response(["message" => 'Successfully deleted course', "status" => true]);
    }

    public function studentTeacherCourse(Request $request){
        $studentCourse = \App\StudentCourse::with(["course.latestCourseApprovalRequest"])
        ->where("user_id", $request->input("id", 0))
        ->whereHas("course" , function($query){
            $query->where("user_id", Auth::id());
        })->get();

        return response($studentCourse);
    }

    public function allMyCourses(Request $request){
        $studentCourse = \App\StudentCourse::with(["course.user", "course.latestCourseApprovalRequest"])
        ->whereHas("course.latestCourseApprovalRequest", function($query){
            $query->where("status", 1);
        })
        ->where("user_id", Auth::id())->get();

        return response($studentCourse);
    }



}
