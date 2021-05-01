<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class HomeVideoController extends Controller
{


    public function videos(Request $request){
        $video = \App\Asset::where("type", "video")->orderBy("sort_order", "ASC")->get();
        return response($video);
    }

    public function save(Request $request){
        $validator = Validator::make($request->all(), [
            'file_path' => ['required']
        ]);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }



        if($request->input("id", 0)){
            $asset = \App\Asset::find($request->input("id", 0));
        }else{
            $asset = new \App\Asset;
            $asset->type = $request->input("type", 'video');
        }
        $asset->file_path = $request->input("file_path", '');
        $asset->name = $request->input("name", '');
        $asset->description = $request->input("description", '');
        $asset->sort_order = $request->input("sort_order", 0);


        $asset->save();
        return response(['message' => 'successfully saved', 'status' => true]);
    }

    public function delete(Request $request){
        \App\Asset::where("type", "video")->where("id", $request->input("id", 0))->delete();
        return response(['message' => 'successfully deleted', 'status' => true]);
    }

}
