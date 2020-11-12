<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

class StudentCourse extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable, SoftDeletes;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
         'user_id', 'course_id', 'status'
    ];


    protected $appends = array('status_text');

    public function getStatusTextAttribute()
    {
        return (($this->status) ? 'Active' : 'In-Active');
    }


    public function student()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function course()
    {
        return $this->belongsTo('App\Course');
    }

    public function courseTrack()
    {
        return $this->hasMany('App\StudentCourseTrack','course_id', 'course_id');
    }

    public function studentCourseTrack()
    {
        return $this->hasMany('App\StudentCourseTrack','user_id', 'user_id');
    }

}
