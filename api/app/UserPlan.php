<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class UserPlan extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable, SoftDeletes;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'plan_id', 'start_date', 'end_date', 'plan_purchase_id'
    ];

    protected $appends = array('remaining_days');


    public static function boot() {
        parent::boot();

        static::deleting(function($userPlan) { // before delete() method call this
             $userPlan->planPurchase()->delete();
        });


    }


    public function getRemainingDaysAttribute()
    {
        $date = Carbon::parse($this->end_date);
        $now = Carbon::now();

        return $date->diffInDays($now);
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function plan()
    {
        return $this->belongsTo('App\Plan');
    }

    public function planPurchase()
    {
        return $this->belongsTo('App\PlanPurchase');
    }


}
