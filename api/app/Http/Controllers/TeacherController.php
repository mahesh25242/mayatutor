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


class TeacherController extends Controller
{

    public function changeBanner(Request $request){
        $status = false;
        if ($request->hasFile('img')) {
            $status = true;
            $bannerName = sprintf("%s.%s",time(), $request->file('img')->extension());
            $destinationPath = "assets/banner";
            $request->file('img')->move($destinationPath, $bannerName);


            $img = Image::make($destinationPath.'/'.$bannerName);//->resize(1700, 200);
            $img->save($destinationPath.'/'.$bannerName, 60);
            $teacherBanner = \App\TeacherBanner::updateOrCreate(
                [
                    "user_id" => Auth::id(),
                ],
                [
                    "user_id" => Auth::id(),
                    "img" => $bannerName
                ]
            );

            return response([
                'message' => 'successfully updated!', 'status' => $status
            ]);
        }else{
            return response([
                'message' => 'sorry file not uploaded!', 'status' => $status
            ], 421);
        }
    }
}
