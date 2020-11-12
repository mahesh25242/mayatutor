<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;

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

    public function myCourseStatistics(Request $request){
        $assignedCourse = \App\StudentCourse::whereHas("course" , function($query) { $query->where("status", 1); })
        ->where("user_id", Auth::id())->get()->count();

        $startedCourse = \App\StudentCourse::whereHas("course" , function($query) {
             $query->where("status", 1);
        })->whereHas("courseTrack" , function($query){
            $query->where("user_id", Auth::id());
        })
        ->where("user_id", Auth::id())->get()->count();

        $notStartedCourse = \App\StudentCourse::whereHas("course" , function($query) {
             $query->where("status", 1);
        })->whereDoesntHave("courseTrack" , function($query){
            $query->where("user_id", Auth::id());
        })
        ->where("user_id", Auth::id())->get()->count();

        $studentCourseQry = \App\StudentCourse::whereHas("course" , function($query) {
            $query->where("status", 1)->whereHas("studentCourseTrack" , function($quesry){
                $query->where("user_id", Auth::id());
            });
        })->where("user_id", Auth::id())

        ->join("course_modules", "course_modules.course_id", "=", "student_courses.course_id");

        $courseModuleQry = \App\StudentCourse::whereHas("course" , function($query) {
            $query->where("status", 1);
        })->join("course_modules", "course_modules.course_id", "=", "student_courses.course_id")
        ->where("student_courses.user_id", Auth::id())
        ->where("course_modules.status", 1)
        ->select("student_courses.course_id", DB::raw("COUNT(".DB::getTablePrefix()."course_modules.id) as module_counts"))
        ->groupBy("student_courses.course_id");



        $completedCourseCourse = $studentCourseQry->joinSub($courseModuleQry, 'course_modules', function ($join) {
            $join->on('student_courses.course_id', '=', 'course_modules.course_id');
        });

        $stati = [
            "course" => $assignedCourse,
            "startedCourse" => $startedCourse,
            "notStartedCourse" => $notStartedCourse,
            "completedCourseCourse" =>$completedCourseCourse->get()
        ];
        return response($stati);
    }



}
