<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;
use Validator;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{


    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fname' => 'required',
            'lname' => 'required',
            'email' => 'required|email',
            'phone' => 'required|unique',
            'password' => 'required'
        ]);

        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }

        $input = $request->all();
        $input['password'] = Hash::make($input['password']);
        $user = User::create($input);

        /**Take note of this: Your user authentication access token is generated here **/
        $data['token'] =  $user->createToken('MyApp')->accessToken;
        $data['name'] =  $user->fname;

        return response(['data' => $data, 'message' => 'Account created successfully!', 'status' => true]);
    }




}
