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
    protected $appends = array('is_online');
    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $firstName = strtolower($model->fname);
            $lastName = strtolower($model->lname);
            $url = Str::slug($firstName.$lastName);
            $i = 0;
            while(User::whereUrl($url)->exists())
            {
                $i++;
                $url = Str::slug($firstName[0] . $lastName . Str::random(4));
            }

            $model->url = $url;

        });
    }




    public function getAvatarAttribute($avatar)
    {
        return (($avatar) ? url().'/assets/avatar/'.$avatar : 'assets/tumb.png');
    }

    public function getisOnlineAttribute()
    {
        return Cache::has('user-is-online-' . $this->id);
    }


    public function findForPassport($username)
    {
        $customUsername = 'phone';
        return $this->where($customUsername, $username)->first();
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

}
