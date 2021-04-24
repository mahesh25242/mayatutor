<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;
use App\UserActivationKey;
use Validator;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cookie;
use Image;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use App\Mail\ActivationMail;
use App\Mail\PasswordChangedNotification;
use App\Mail\RetrievePassword;
use Mail;
use Cache;
use Barryvdh\DomPDF\Facade as PDF;

class UsersController extends Controller
{


    public function test(Request $request){
        $pdf = PDF::loadView('PDF.teacherInvoice');
        $pdf->save(public_path('assets/invoices/export.pdf'));

        // Cache::flush();
        // $user = User::find(9);
        //    Mail::to("mahesh25242@gmail.com")->send(new ActivationMail($user,  $request->header("From-Domain")));
    }

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

                //user pla selection
                $UserPlan = \App\UserPlan::where("user_id", $user->id)
                ->where("end_date", ">", new Carbon)->get()->first();
                if(!$UserPlan){
                        $currentTime = new Carbon;
                        $plan = \App\Plan::where("basic", 1)->get()->first();
                        $user->userPlan()->updateOrCreate(
                            [
                                "plan_id" => $plan->id,
                            ],
                            [
                                "plan_id" => $plan->id,
                                "start_date" => new Carbon,
                                "end_date" => $currentTime->add($plan->days, 'day'),
                            ]
                        );
                }
            break;
            default:
                $user->userRole()->updateOrCreate(
                [
                    "role_id" => 3,
                ],
                [
                    "role_id" => 3,
                ]
            );
            break;
        }
        /**Take note of this: Your user authentication access token is generated here **/
        $data['token'] =  $user->createToken('MayaTutorial')->accessToken;
        $data['name'] =  $user->fname;

        $toEMail = $user->email;
        if(env('APP_ENV') == 'local'){
            $toEMail = env('DEVELOPER_MAIL');
        }
        $userActivationKey = new UserActivationKey;
        $userActivationKey->key = uniqid($user->id);
        $userActivationKey->user_id = $user->id;
        $userActivationKey->save();


        try{
            Mail::to($toEMail)->send(new ActivationMail($user,  $request->header("From-Domain")));
        }catch (\Swift_TransportException $e) {
          //  echo 'Caught exception: ',  $e->getMessage(), "\n";
        }

        return response(['data' => $data, 'message' => 'Account created successfully!', 'status' => true]);
    }

    public function resentActivationMail(Request $request){
        $user = User::find($request->input("id", 0));
        $toEMail = $user->email;
        if(env('APP_ENV') == 'local'){
            $toEMail = env('DEVELOPER_MAIL');
        }
        $userActivationKey = new UserActivationKey;
        $userActivationKey->key = uniqid($user->id);
        $userActivationKey->user_id = $user->id;
        $userActivationKey->save();


        try{
            Mail::to($toEMail)->send(new ActivationMail($user,  $request->header("From-Domain")));
        }catch (\Swift_TransportException $e) {
          //  echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
        return response([ 'message' => 'Successfully sent the mail!', 'status' => true]);
    }

    public function authUser(Request $request){
        $user = \App\User::with(["country", "state", "city", "role", "lastLogin",
        "teacherPaymentInfo", "subject", "teacherInfo.education", "teacherBanner", "rating", "currentUserPlan.plan", "nextUserPlan.plan"])->find(Auth::id());
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

        if($request->input("id", null) && Auth::user()->isAdmin()->exists()){
            $user = \App\User::find($request->input("id", null));
        }else{
            $user = \App\User::find(Auth::id());
        }

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

           //plan updation if user has no plan it wont exicute onlty rare condition
           if(!$user->userPlan->count()){
                $currentTime = new Carbon;
                $plan = \App\Plan::where("basic", 1)->get()->first();
               $user->userPlan()->updateOrCreate(
                   [
                       "plan_id" => $plan->id,
                   ],
                   [
                       "plan_id" => $plan->id,
                       "start_date" => new Carbon,
                       "end_date" => $currentTime->add($plan->days, 'day'),
                   ]
               );
           }

        }


        if($request->input("isChanegPassword", false)){
            $user->password = Hash::make($request->input("password",null));
        }
        $user->save();
        if($request->input("isChanegPassword", false)){
            $toEMail = $user->email;
            if(env('APP_ENV') == 'local'){
                $toEMail = env('DEVELOPER_MAIL');
            }

            try{
                Mail::to($toEMail)->send(new PasswordChangedNotification($user));
            }catch (\Swift_TransportException $e) {
            //  echo 'Caught exception: ',  $e->getMessage(), "\n";
            }
        }

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
                // 'qr_code1' => $request->input("payment.qr_code1", ''),
                // 'qr_code2' => $request->input("payment.qr_code2", ''),
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
            $validator = Validator::make($request->all(), [
                'avatharImg' => 'max:1024', //5MB
            ]);

            if($validator->fails()){
                return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
            }

            $status = true;
            $avatharName = sprintf("%s.%s",time(), $request->file('avatharImg')->extension());
            $destinationPath = "assets/avatar";
            $request->file('avatharImg')->move($destinationPath, $avatharName);


            $img = Image::make($destinationPath.'/'.$avatharName);//->resize(126, 139);
            $img->save($destinationPath.'/'.$avatharName, 60);
            if($request->input("id", null) && Auth::user()->isAdmin()->exists()){
                $user = \App\User::find($request->input("id", null));
            }else{
                $user = \App\User::find(Auth::id());
            }


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



    public function fetchAllStudent(Request $request){
        $perPage = 20;
        $q = $request->input("q",'');
        $user = User::whereHas("userRole", function($q){
            $q->where("role_id", 3);
        })->withCount(["studentCourse"])->WhereRaw(" ( concat(`fname`, ' ', `lname`) like '%{$q}%'
        OR `email` like '%{$q}%'
        OR `phone` like '%{$q}%') ");

        if($request->input("teacherId", null)){
            $user = $user->whereHas("student", function($qry) use($request){
                $qry->where("teacher_user_id", $request->input("teacherId", null));
            });
        }
        if($request->input("status", null)){
            $user = $user->where("status", $request->input("status", null));
        }

        return response($user->paginate($perPage));
    }

    public function fetchAllTeacher(Request $request){
        $perPage = 20;
        $q = $request->input("q",'');
        $user = User::withCount("teacherStudent as student_count")->whereHas("userRole", function($q){
            $q->where("role_id", 2);
        })->WhereRaw(" ( concat(`fname`, ' ', `lname`) like '%{$q}%'
                        OR `email` like '%{$q}%'
                        OR `phone` like '%{$q}%') ")
        ->paginate($perPage);
        return response($user);
    }

    public function fetchStudent($id=0){
        $user = User::with(["city"])->where("id", $id)->get()->first();
        return response($user);
    }

    public function fetchTeacher($id=0){
        $user = User::withCount("teacherStudent as student_count", "course", "teacherAutoApproval")
        ->with(["country", "state", "city", "role", "lastLogin",
        "teacherPaymentInfo", "subject", "teacherInfo.education",
        "teacherBanner", "rating", "currentUserPlan.plan"])
        ->where("id", $id)->get()->first();
        return response($user);
    }


    public function toggleStatus(Request $request){
        $user = User::find($request->input("id", 0));
        if($user){
            $user->status =  !$user->status;
            $user->save();
        }

        return response([
            'message' => 'successfully changed status', 'status' => 1
        ]);
    }

    public function delete(Request $request){
        $user = User::find($request->input("id", 0));
        if($user){
            $user->delete();
        }
        return response([
            'message' => 'successfully deleted', 'status' => 1
        ]);
    }

    public function toUser(Request $request){
        $users = [];
        $q = $request->input("q", '');
        if( \App\User::has("isTeacher")->find(Auth::id())){
            $users = \App\User::whereHas("student", function($query){
                $query->where("teacher_user_id", Auth::id());
            })->where("fname", "LIKE", "%{$q}%")->paginate(40);
        }else if( \App\User::has("isAdmin")->find(Auth::id())){
             $users = \App\User::where("fname", "LIKE", "%{$q}%")->paginate(40);
        }else{
            $users = \App\User::whereHas("teacherStudent", function($query){
                $query->where("user_id", Auth::id());
            })->where("fname", "LIKE", "%{$q}%")->paginate(40);
        }
        return response($users);
    }

    public function login(Request $request){
        //$uid =  $request->input("uid",'');

        $idToken =  $request->input("oauthIdToken", null);
        $accessToken =  $request->input("oauthAccessToken",'');
        $providerId =  $request->input("providerId",'');
        $signInMethod =  $request->input("signInMethod",'');

        $auth = app('firebase.auth');
        //$signInResult = $auth->getUser($uid);;

        try {
            switch($providerId){
                case "google.com":
                    $verifiedIdToken = $auth->signInWithIdpIdToken($providerId, $idToken);
                break;
                default:
                    $verifiedIdToken = $auth->signInWithIdpAccessToken($providerId, $accessToken);
                break;
            }

        } catch (InvalidToken $e) {
            echo 'The token is invalid: '.$e->getMessage();
        } catch (\InvalidArgumentException $e) {
            echo 'The token could not be parsed: '.$idToken.'=='.$e->getMessage();
        }

        $authUser = $auth->getUser($verifiedIdToken->firebaseUserId());

        $user = User::where("email", $authUser->email)->get()->first();
        $endpoint = url("v1/oauth/token");
        $client = new \GuzzleHttp\Client();

        if($user){




            $user->fname = $authUser->displayName;

            $user->is_social = 1;
            $user->status = 1;
            $user->save();
            $postArr = [
                'grant_type' => "password",
                'client_id' => 2,
                'client_secret' => 'gGns8qiSpmPTBhfWJfZfle2pQqFJB439zbgrHdqw',
                'password' => $authUser->uid,
                'username' => $authUser->email,
                'scope' => "",
                'recaptcha' => null
            ];



            $response = $client->post( $endpoint, ['form_params' => $postArr,
            'headers' => [
                'Accept' => 'application/json'
            ]
            ]);

            // url will be: http://my.domain.com/test.php?key1=5&key2=ABC;

            $statusCode = $response->getStatusCode();
            return $content = $response->getBody();

        }else{

/*
            $this->social = 1;
            $request->request->add([
                'name' => $authUser->displayName,
                'email' => $authUser->email,
                'password' => $authUser->uid,
                ]);//displayName
           $result =  $this->create($request);

           $postArr = [
                'grant_type' => "password",
                'client_id' => 2,
                'client_secret' => 'gGns8qiSpmPTBhfWJfZfle2pQqFJB439zbgrHdqw',
                'password' => $authUser->uid,
                'username' => $authUser->email,
                'scope' => "",
                'recaptcha' => null
            ];

           $response = $client->post($endpoint, ['form_params' => $postArr,
           'headers' > [
            'Accept' => 'application/json'
            ]
        ]);


        $statusCode = $response->getStatusCode();
        return $content = $response->getBody();*/
        return response(["error" => 1, "message" => "no user found for {$authUser->email}"] , 401);
        }




    }

    public function reterievePassword(Request $request){

        $validator = Validator::make($request->all(), [
            'username' => ['required']
        ],[],[
            'username' => 'Email / Mobile'
        ]);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }


        $emailMobile = $request->input("username");
        $user = User::where("email",$emailMobile)
        ->orWhere("phone", $emailMobile)->get()->first();
        if($user){
            $toEMail = $user->email;
            if(env('APP_ENV') == 'local'){
                $toEMail = env('DEVELOPER_MAIL');
            }
            $userActivationKey = new UserActivationKey;
            $userActivationKey->key = uniqid($user->id);
            $userActivationKey->user_id = $user->id;
            $userActivationKey->save();


            try{
                Mail::to($toEMail)->send(new RetrievePassword($user, $request->header("From-Domain")));
            }catch (\Swift_TransportException $e) {
            //  echo 'Caught exception: ',  $e->getMessage(), "\n";
            }

            return response([
                'message' => 'successfully sent mail', 'status' => 1
            ]);
        }else{
            return response(['message' => 'Validation errors', 'errors' =>  ["username" => 'user not exists'], 'status' => false], 422);
        }

    }

    public function setNewPassword(Request $request){
        $validator = Validator::make($request->all(), [
            'key' => ['required'],
            'password' => ['required', 'string','min:6',  'max:255', 'confirmed'],
            'password_confirmation' =>  [ 'required', 'string',  'max:255']
        ],[],[
            'key' => 'Key',
            'password' => 'Password',
            'password_confirmation' => 'Confirm Password',
        ]);
        $validationField["password"] = ['required', 'string','min:6',  'max:255', 'confirmed'];
        $validationField["password_confirmation"] = [ 'required', 'string',  'max:255'];

        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }


        $key = UserActivationKey::where("key", $request->input("key"))
        ->get()->first();

        if($key && $key->user){
            $toEMail = $key->user->email;
            if(env('APP_ENV') == 'local'){
                $toEMail = env('DEVELOPER_MAIL');
            }
            if($request->input('password', null)){
                $key->user->password = Hash::make($request->input('password', null));
                $key->user->save();
                try{
                    Mail::to($toEMail)->send(new PasswordChangedNotification($key->user));
                }catch (\Swift_TransportException $e) {
                //  echo 'Caught exception: ',  $e->getMessage(), "\n";
                }
                $key->delete();
                return response([
                    'message' => 'successfully sent mail', 'status' => 1
                ]);
            }else{
                return response(['message' => 'Validation errors', 'errors' =>  ["password" => 'no user found'], 'status' => false], 422);
            }




        }else{
            return response(['message' => 'Validation errors', 'errors' =>  ["password" => 'user not exists'], 'status' => false], 422);
        }
    }

    public function activateUser(Request $request){
        $validator = Validator::make($request->all(), [
            'key' => ['required', 'string']
        ],[],[
            'key' => 'Key',
        ]);
        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }
        $key = UserActivationKey::where("key", $request->input("key"))
        ->get()->first();

        if($key && $key->user){
            $key->user->activated_at = Carbon::now();
            $key->user->status = 1;
            $key->user->save();
            $key->delete();
            return response([
                'message' => 'activated account', 'status' => 1
            ]);
        }else{
            return response(['message' => 'Validation errors', 'errors' =>  ["key" => 'user not exists'], 'status' => false], 422);
        }
    }

    public function setRating(Request $request){
        $user_id = $request->input("user_id", 0);
        $rate = $request->input("rate", 0);
        $rating = \App\Rating::where("user_id", $user_id)->get()->first();
        if($rating){
            if($rating->MyratingTran)
                $rating->rate = $rating->rate - $rating->MyratingTran->rate;
            $rating->rate += (float) $rate ;
            if(!$rating->MyratingTran)
                ++$rating->tot_users ;
        }else{
            $rating = new \App\Rating;
            $rating->rate = (float) $rate ;
            $rating->user_id = $user_id ;
            $rating->created_by = Auth::id() ;
            $rating->updated_by = Auth::id() ;
            $rating->tot_users = 1 ;
        }
        $rating->save();
        \App\RatingTran::updateOrCreate(
            [
                "user_id" => Auth::id() ,
                "rating_id" => $rating->id ,
            ],
            [
                "rate" =>(float) $rate
            ]
        );

        $rating->MyratingTran;
        return response($rating);
    }
}
