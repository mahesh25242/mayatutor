<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;
use Validator;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cookie;

class UsersController extends Controller
{


    public function signUp(Request $request)
    {

        $return  = null;
        $recaptcha = new \ReCaptcha\ReCaptcha(env("RECAPTCHA_SECRET"));
        $resp = $recaptcha->setExpectedAction("SignUp")
                        //->setExpectedHostname(env("APP_URL"))
                        ->verify($request->input('recaptcha'), $request->ip());
        if (!$resp->isSuccess()) {
           return response($resp->getErrorCodes());
        }


        $validator = Validator::make($request->all(), [
            'fname' => ['required'],
            'lname' => ['required'],
            'country_id' => ['required'],
            'state_id' => ['required'],
            'city_id' => ['required'],
            'pin' => ['required'],
            'email' => ['required', 'email'],
            'phone' => ['required', 'unique:users'],
            'address' => ['string'],
            'password' => ['required', 'string','min:6',  'max:255', 'confirmed'],
            'password_confirmation' => ['required', 'string',  'max:255']
        ],[],[
            'fname' => 'First name',
            'lname' => 'Last name',
            'password_confirmation' => "Confirm Password"
        ]);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }

        $input = $request->all();
        $input["country_id"] = $request->input("country_id.id",0);
        $input["state_id"] = $request->input("state_id.id",0);
        $input["city_id"] = $request->input("city_id.id",0);
        $input['password'] = Hash::make($input['password']);
        $user = User::create($input);

        switch($request->input("type", "student")){
            case 'teacher':
                $user->userRole()->updateOrCreate(
                    [
                        "role_id" => 2,
                    ],
                    [
                        "role_id" => 2,
                    ]
                );
            break;
            default:
                $user->userRole()->updateOrCreate(
                [
                    "role_id" => 2,
                ],
                [
                    "role_id" => 2,
                ]
            );
            break;
        }
        /**Take note of this: Your user authentication access token is generated here **/
        $data['token'] =  $user->createToken('MyApp')->accessToken;
        $data['name'] =  $user->fname;

        return response(['data' => $data, 'message' => 'Account created successfully!', 'status' => true]);
    }

    public function authUser(Request $request){
        $user = \App\User::with(["country", "state", "city", "role"])->find(Auth::id());
        return response($user);
    }


}
