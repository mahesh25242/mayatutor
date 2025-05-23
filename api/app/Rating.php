<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Support\Facades\Auth;

class Rating extends Model implements AuthenticatableContract, AuthorizableContract
{

    use HasApiTokens, Authenticatable, Authorizable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'rate', 'user_id', 'created_by', 'updated_by', 'deleted_by', 'tot_users'
    ];



    public function user()
    {
        return $this->belongsTo('App\User');
    }


    public function createdBy()
    {
        return $this->belongsTo('App\User', 'created_by');
    }

    public function ratingTran()
    {
        return $this->hasMany('App\RatingTran');
    }

    public function MyratingTran()
    {
        return $this->hasOne('App\RatingTran')->where("user_id", Auth::id());
    }
}
