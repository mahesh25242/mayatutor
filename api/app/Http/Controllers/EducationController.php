<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EducationController extends Controller
{



    public function getAllEducation(Request $request){
        $educations = \App\Education::where("status", 1)->get();
        return response($educations);
    }




}
