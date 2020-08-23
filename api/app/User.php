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

class User extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable, SoftDeletes;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'fname', 'mname', 'lname','email',  'password', 'phone', 'address', 'country_id',
        'state_id', 'city_id', 'pin', 'status', 'created_by', 'updated_by', 'deleted_by',
        'avatar'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

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
}
