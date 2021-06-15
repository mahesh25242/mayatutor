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
        'name', 'description', 'features', 'price', 'sortorder',
         'basic', 'days'
    ];

    protected $appends = array('usd_amount', "billed_text");

    public function getUsdAmountAttribute()
    {
        return ($this->price) ? round($this->price / 73, 2) : 0;
    }

    public function getBilledTextAttribute()
    {
        $billedText = '';
        switch(true){
            case $this->days < 32:
                $billedText = 'Monthly';
            break;
            case $this->days > 32 && $this->days < 186:
                $billedText = 'Half-yearly';
            break;
            case $this->days > 186 && $this->days < 367:
                $billedText = 'yearly';
            break;
        }
        return  $billedText;
    }


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
        ->where("end_date", ">", new Carbon)->orderBy("end_date", "ASC")->take(1);
    }

    public function planPurchase()
    {
        return $this->hasMany('App\PlanPurchase');
    }

}
