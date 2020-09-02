<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SubjectController extends Controller
{


    public function getAllSubjects(Request $request){
        $subjects = \App\Subject::where("status", 1)->get();
        return response($subjects);
    }

}
