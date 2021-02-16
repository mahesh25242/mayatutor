<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

class CouponTrack extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable, SoftDeletes;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'coupon_id', 'user_id'
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


    public function coupon()
    {
        return $this->belongsTo('App\Coupon');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }


}
