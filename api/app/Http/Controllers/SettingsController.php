<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class SettingsController extends Controller
{


    public function settings(Request $request){
        $settings = \App\Setting::all();
        return response($settings);
    }

    public function saveSetting(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => ['required'],
            'value' => ['required'],
        ]);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
        $setting = \App\Setting::find($request->input("id", 0));
        $setting->value = $request->input("value", '');
        $setting->save();
        return response(['message' => 'successfully saved', 'status' => true]);
    }


}
