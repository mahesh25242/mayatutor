<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class Plan extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable, SoftDeletes;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'code', 'description', 'features', 'sortorder', 'basic', 'days'
    ];

    public function getFeaturesAttribute($value)
    {
        return json_decode($value);
    }

    public function userPlan()
    {
        return $this->hasMany('App\UserPlan');
    }

    public function myUserPlan()
    {
        return $this->hasOne('App\UserPlan')->where("user_id", Auth::id())
        ->where("end_date", ">", new Carbon);
    }

}
