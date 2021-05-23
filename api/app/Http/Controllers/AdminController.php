<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use Lexx\ChatMessenger\Models\Thread;

class AdminController extends Controller
{


    public function index(Request $request){
        $teacherCount = \App\User::has("isTeacher")->count();

        $studentCount = \App\User::has("isStudent")->count();

        $courseCount = \App\Course::count();
        $messageCount = Thread::forUser(Auth::id())->count();

        return response([
            "teacher" => $teacherCount,
            "students" => $studentCount,
            "course" => $courseCount,
            "message" => $messageCount,
        ]);
    }


}
