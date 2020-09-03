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


class CourseController extends Controller
{

    public function listCourses(Request $request){
        $courses = \App\Course::all();
        return response($courses);
    }

    public function createCourse(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => ['required'],
            'price' => ['required']
        ]);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
    }
}
