<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;
use Validator;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cookie;
use Image;
use Illuminate\Support\Facades\Storage;


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
        $user = \App\User::with(["country", "state", "city", "role", "lastLogin",
        "teacherPaymentInfo", "subject", "teacherInfo.education", "teacherBanner", "rating"])->find(Auth::id());
        return response($user);
    }

    public function signOut(Request $request){
        $request->user()->token()->revoke();

    // Revoke all of the token's refresh tokens
    // => Set public.oauth_refresh_tokens.revoked to TRUE (t)
        $refreshTokenRepository = app('Laravel\Passport\RefreshTokenRepository');
        $refreshTokenRepository->revokeRefreshTokensByAccessTokenId($request->user()->token()->id);

        return response([
            'message' => 'successfully logged!', 'status' => true
        ]);
    }

    public function setUserLogin(Request $request){

        $validator = Validator::make($request->all(), [
            'action' => ['required', 'string'],
        ]);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }


        $userLogin = new \App\UserLogin;
        $userLogin->user_id = Auth::id();
        $userLogin->name = $request->input("action");
        $userLogin->save();
        return response([
            'message' => 'successfully saved!', 'status' => true
        ]);
    }

    public function updateProfile(Request $request){


        $validationField = [
            'fname' => ['required'],
            'lname' => ['required'],
            'country_id' => ['required'],
            'state_id' => ['required'],
            'city_id' => ['required'],
            'pin' => ['required'],
            'email' => ['required', 'email'],
            'address' => ['string'],
        ];


        if($request->input("isChanegPassword", false)){
            $validationField["password"] = ['required', 'string','min:6',  'max:255', 'confirmed'];
            $validationField["password_confirmation"] = [ 'required', 'string',  'max:255'];
        }
        $validator = Validator::make($request->all(), $validationField,[],[
            'fname' => 'First name',
            'lname' => 'Last name',
            'password_confirmation' => "Confirm Password"
        ]);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }


        $user = \App\User::find(Auth::id());
        $user->fname = $request->input("fname", '');
        $user->lname = $request->input("lname",'');
        $user->email = $request->input("email",'');
        $user->address = $request->input("address",'');
        $user->pin = $request->input("pin",'');
        $user->country_id = $request->input("country_id.id",0);
        $user->state_id = $request->input("state_id.id",0);
        $user->city_id = $request->input("city_id.id",0);
        $user->updated_by = Auth::id();


        if($user->userRole()->where("role_id", 2)->exists()){
           $this->updateTeacherMyProfile($request, $user);
        }


        if($request->input("isChanegPassword", false)){
            $user->password = Hash::make($request->input("password",null));
        }
        $user->save();
        return response([
            'message' => 'successfully saved!', 'status' => true
        ]);
    }

    private function updateTeacherMyProfile(Request $request, $user){

        \App\TeacherPaymentInfo::updateOrCreate(
            [
                'user_id' => $user->id
            ],
            [
                'account_name' => $request->input("payment.account_name", ''),
                'account_number' => $request->input("payment.account_number", ''),
                'ifsc_code' => $request->input("payment.ifsc_code", ''),
                'bank_name' => $request->input("payment.bank_name", ''),
                'qr_code1' => $request->input("payment.qr_code1", ''),
                'qr_code2' => $request->input("payment.qr_code2", ''),
                'user_id' => $user->id
            ]
        );
        $education_id = 0;
        if(!$request->input("info.education.id", 0) && $request->input("info.education.name", null)){
            $education = new \App\Education;
            $education->name = $request->input("info.education.name", '');
            $education->save();
            $education_id = $education->id;
        }else{
            $education_id = $request->input("info.education.id", 0);
        }

        \App\TeacherInfo::updateOrCreate(
            [
                'user_id' => $user->id
            ],
            [
                'experiance' => $request->input("info.expieriance", ''),
                'time' => $request->input("info.time", ''),
                'fees' => $request->input("info.fees", ''),
                'education_id' =>  $education_id,
                'other' => $request->input("info.other", ''),
                'user_id' => $user->id
            ]
        );

        if($request->input("info.subject", null)){
            $subjectArr = $request->input("info.subject", null);
            $subIds = collect($subjectArr);
            $pluckIds = $subIds->pluck("id");
            \App\TeacherSubject::where("user_id", $user->id)
            ->whereNotIn("subject_id", $pluckIds)->delete();

            if(is_array($subjectArr) && !empty($subjectArr)){
                foreach($subjectArr as $sub){
                    if(!isset($sub["id"])){
                        $subject = new \App\Subject;
                        $subject->name = (isset($sub["name"])) ? $sub["name"] : '';
                        $subject->save();
                        $sub["id"] = $subject->id;
                    }

                    \App\TeacherSubject::updateOrCreate(
                        [
                            'user_id' => $user->id,
                            'subject_id' => $sub["id"],
                        ],
                        [
                            'user_id' => $user->id,
                            'subject_id' => $sub["id"],
                        ]
                    );



                }
            }
        }

    }


    public function updateAvatar(Request $request){
        $status = false;
        if ($request->hasFile('avatharImg')) {
            $status = true;
            $avatharName = sprintf("%s.%s",time(), $request->file('avatharImg')->extension());
            $destinationPath = "assets/avatar";
            $request->file('avatharImg')->move($destinationPath, $avatharName);


            $img = Image::make($destinationPath.'/'.$avatharName)->resize(126, 139);
            $img->save($destinationPath.'/'.$avatharName, 60);
            $user = \App\User::find(Auth::id());
            $user->avatar = $avatharName;
            $user->save();
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
