<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PlanController extends Controller
{


    public function plans(Request $request){
        $plans = \App\Plan::with(["myUserPlan"])->get();
        return response($plans);
    }






}
