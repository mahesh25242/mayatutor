<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;

class TeacherInfo extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'experiance', 'time', 'fees', 'education_id', 'other'
    ];


    public function teacherSubject()
    {
        return $this->hasMany('App\TeacherSubject');
    }


    public function education()
    {
        return $this->belongsTo('App\Education');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
