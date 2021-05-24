<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use DB;
use App\Http\Resources\UserCollection;

class StudentController extends Controller
{



    public function studenttoggleStatus(Request $request){
        $teacherStudent = \App\TeacherStudent::find($request->input("id"));
        if($teacherStudent){
            $teacherStudent->status =  !$teacherStudent->status;
            $teacherStudent->save();
        }

        return response(["message" => 'Successfully changed status', "status" => true]);
    }

    public function myStudents(Request $request){


        $perPage = 20;
        $q = $request->input("q",'');

        $user = \App\User::has("isStudent")->withCount(["studentCourse"])->with(["student" => function($qry){
            $qry->thisTeacherStudent();
        }])

        ->WhereRaw(" ( concat(`fname`, ' ', `lname`) like '%{$q}%'  OR `email` like '%{$q}%'    OR `phone` like '%{$q}%') ");

        $user = $user->whereHas("student", function($qry) use($request){
            $qry->where("teacher_user_id", Auth::id());
        });

       // return response($user->paginate($perPage));
        return response(new UserCollection($user->paginate($perPage)));


    }
    public function deleteStudent(Request $request){
        $teacherStudent = \App\TeacherStudent::find($request->input("id"));
        if($teacherStudent && $teacherStudent->teacher_user_id == Auth::id()){
            $teacherStudent->delete();
            return response([
                'message' => 'successfully deleted!', 'status' => 1
            ]);
        }else{
            return response([
                'message' => 'sorry student not found!', 'status' => 1
            ], 422);
        }

    }




}
