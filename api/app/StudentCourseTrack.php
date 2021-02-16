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
use App\Observers\StudentCourseTrackObserver;

class StudentCourseTrack extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable, SoftDeletes, StudentCourseTrackObserver;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'student_course_id', 'status'
    ];





    public function studentCourseModuleTrack()
    {
        return $this->hasMany('App\StudentCourseModuleTrack');
    }

    public function studentCourse()
    {
        return $this->belongsTo('App\StudentCourse');
    }


}
