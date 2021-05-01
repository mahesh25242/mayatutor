<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class BannerController extends Controller
{


    public function banners(Request $request){
        $assets = \App\Asset::where("type", "banner")->orderBy("sort_order", "ASC")->get();
        return response($assets);
    }

    public function save(Request $request){
        $validator = Validator::make($request->all(), [
            'file_path' => ['mimes:jpeg,png,bmp,tiff', 'max:1024']
        ]);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
        $file_path = '';

        if($request->hasFile('file_path')){
            $file_path = sprintf("%s.%s",time(), $request->file('file_path')->extension());
            $destinationPath = "assets/public/banner";
            $request->file('file_path')->move($destinationPath, $file_path);
        }


        if($request->input("id", 0)){
            $asset = \App\Asset::find($request->input("id", 0));
            if($file_path){
                $asset->file_path = $file_path;
            }
        }else{
            $asset = new \App\Asset;
            $asset->type = $request->input("type", 'banner');
            $asset->file_path = $file_path;
        }

        $asset->name = $request->input("name", '');
        $asset->description = $request->input("description", '');
        $asset->sort_order = $request->input("sort_order", 0);


        $asset->save();
        return response(['message' => 'successfully saved', 'status' => true]);
    }

    public function delete(Request $request){
        \App\Asset::where("type", "banner")->where("id", $request->input("id", 0))->delete();
        return response(['message' => 'successfully deleted', 'status' => true]);
    }

}
