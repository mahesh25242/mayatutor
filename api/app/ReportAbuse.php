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

class ReportAbuse extends Model implements AuthenticatableContract, AuthorizableContract
{

    use HasApiTokens, Authenticatable, Authorizable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'info', 'reported_by', 'reported_by_name'
    ];



    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function reportBy()
    {
        return $this->belongsTo('App\User', 'reported_by');
    }



}
