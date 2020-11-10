<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class StudentCourseTrackController extends Controller
{


    public function launchModule(Request $request){


        return response(['message' => 'Successfully started module', 'status' => true]);
    }




}
