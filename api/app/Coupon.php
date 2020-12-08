<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

class Coupon extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable, SoftDeletes;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'role_id', 'coupon_group_id', 'code', 'description', 'no_use', 'type',
        'value', 'start_date', 'end_date', 'status'
    ];

    protected $appends = array('start_date_arr', 'end_date_arr');

    public function getStartDateAttribute($start_date)
    {
        return  \Carbon\Carbon::parse($start_date)->format('d/m/Y');
    }

    public function getEndDateAttribute($end_date)
    {
        return  \Carbon\Carbon::parse($end_date)->format('d/m/Y');
    }

    public function getStartDateArrAttribute($start_date)
    {
        $cDate = \Carbon\Carbon::parse($start_date);
        return  ["year" => (int) $cDate->format('Y'), "month" => (int) $cDate->format('m'), "day" => (int) $cDate->format('d')];
    }

    public function getEndDateArrAttribute($end_date)
    {
        $cDate = \Carbon\Carbon::parse($end_date);
        return  ["year" => (int) $cDate->format('Y'), "month" => (int) $cDate->format('m'), "day" => (int) $cDate->format('d')];
    }

    public function couponGroup()
    {
        return $this->belongsTo('App\CouponGroup');
    }

    public function role()
    {
        return $this->belongsTo('App\Role');
    }


}
