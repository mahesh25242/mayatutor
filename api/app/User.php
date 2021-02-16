<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Hash;
use Cache;
use Lexx\ChatMessenger\Traits\Messagable;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class User extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable, SoftDeletes, Messagable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'fname', 'mname', 'lname','email',  'password', 'phone', 'address', 'country_id',
        'state_id', 'city_id', 'pin', 'status', 'created_by', 'updated_by', 'deleted_by',
        'avatar', 'url'
    ];
    protected $appends = array('is_online', 'created_at_human', 'is_able');
    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    public static function boot() {
        parent::boot();

        static::deleting(function($course) { // before delete() method call this
             $course->userRole()->delete();
             $course->userLogin()->delete();
             $course->rating()->delete();
             $course->teacherPaymentInfo()->delete();
             $course->teacherSubject()->delete();
             $course->teacherInfo()->delete();
             $course->teacherBanner()->delete();
             $course->course()->delete();
             $course->student()->delete();
             $course->teacherStudent()->delete();
             $course->studentCourse()->delete();
             $course->userPlan()->delete();
             $course->teacherAutoApproval()->delete();
             $course->UserPayment()->delete();
        });
    }

    public function getEmailAttribute($email)
    {
        return (Auth::id()) ? $email : (($email) ? '*': null);
    }

    public function getPhoneAttribute($phone)
    {
        return (Auth::id()) ? $phone : (($phone) ? '*': null);
    }

    public function getIsAbleAttribute()
    {
        if($this->status  == 1 && $this->isTeacher()->exists() && $this->currentUserPlan()->exists()){
            return true;
        }else if($this->status  == 1 && $this->isAdmin()->exists()){
            return true;
        }else if($this->status  == 1 && $this->isStudent()->exists()){
            return true;
        }else{
            return false;
        }
    }


    public function getAvatarAttribute($avatar)
    {
        return (($avatar) ? url().'/assets/avatar/'.$avatar : 'assets/tumb.png');
    }

    public function getisOnlineAttribute()
    {
        return Cache::has('user-is-online-' . $this->id);
    }

    public function getCreatedAtHumanAttribute()
    {
        return $this->created_at->diffForHumans();
    }


    public function findForPassport($username)
    {
        $customUsername = 'phone';
        $userNameExists = $this->where($customUsername, $username)->where("status", 1)->first();
        if($userNameExists){
            return $userNameExists;
        }else{
            $userNameExists = $this->where("email", $username)->where("status", 1)->first();
            return $userNameExists;
        }
    }
    // Owerride password here
    public function validateForPassportPasswordGrant($password)
    {
        $owerridedPassword = 'password';
        return Hash::check($password, $this->password);
    }


    public function userRole()
    {
        return $this->hasMany('App\UserRole');
    }

    public function isAdmin()
    {
        return $this->hasMany('App\UserRole')->where("role_id",1);
    }

    public function isTeacher()
    {
        return $this->hasMany('App\UserRole')->where("role_id",2);
    }

    public function isStudent()
    {
        return $this->hasMany('App\UserRole')->where("role_id",3);
    }

    public function country()
    {
        return $this->belongsTo('App\Country');
    }

    public function state()
    {
        return $this->belongsTo('App\State');
    }

    public function city()
    {
        return $this->belongsTo('App\City');
    }

    public function role()
    {
        return $this->hasManyThrough(
            'App\Role',
            'App\UserRole',
            'user_id', // Foreign key on users table...
            'id', // Foreign key on posts table...
            'id', // Local key on countries table...
            'role_id' // Local key on users table...
        );
    }

    public function userLogin()
    {
        return $this->hasMany('App\UserLogin');
    }

    public function lastLogin()
    {
        return $this->hasOne('App\UserLogin', 'user_id')->where("name", "SignIn")->orderBy("id", "DESC")->skip(1)->take(1);
    }

    public function msgMainThread()
    {
        return $this->hasMany('App\MsgThread');
    }

    public function rating()
    {
        return $this->hasOne('App\Rating');
    }

    public function teacherPaymentInfo()
    {
        return $this->hasOne('App\TeacherPaymentInfo');
    }

    public function teacherSubject()
    {
        return $this->hasMany('App\TeacherSubject');
    }

    public function teacherInfo()
    {
        return $this->hasOne('App\TeacherInfo');
    }

    public function teacherBanner()
    {
        return $this->hasOne('App\TeacherBanner');
    }


    public function course()
    {
        return $this->hasMany('App\Course');
    }





    // public function scopeMyStudents($query)
    // {
    //     return $query->leftJoin('teacher_students1', 'users.id', '=', 'teacher_students.teacher_user_id');
    // }

    public function student()
    {
        return $this->hasOne('App\TeacherStudent');
    }

    public function teacherStudent()
    {
        return $this->hasMany('App\TeacherStudent', 'teacher_user_id');
    }

    public function studentCourse()
    {
        return $this->hasMany('App\StudentCourse', 'user_id');
    }

    public function userPlan()
    {
        return $this->hasMany('App\UserPlan');
    }

    public function currentUserPlan()
    {
        return $this->hasOne('App\UserPlan')->where("end_date", ">", new Carbon)
        ->orderBy("end_date", "ASC")->take(1);;
    }

    public function subject()
    {
        return $this->hasManyThrough(
            'App\Subject',
            'App\TeacherSubject',
            'user_id', // Foreign key on users table...
            'id', // Foreign key on posts table...
            'id', // Local key on countries table...
            'subject_id' // Local key on users table...
        );
    }

    public function teacherAutoApproval()
    {
        return $this->hasOne('App\TeacherAutoApproval');
    }

    public function userPayment()
    {
        return $this->hasMany('App\UserPayment');
    }

    public function couponGroup()
    {
        return $this->hasMany('App\CouponGroup', 'created_by');
    }

    public function couponTrack()
    {
        return $this->hasMany('App\CouponTrack');
    }

    public function planPurchase()
    {
        return $this->hasMany('App\PlanPurchase');
    }

    // public function studentCourseModule()
    // {
    //     return $this->hasMany('App\StudentCourseModule');
    // }
}
