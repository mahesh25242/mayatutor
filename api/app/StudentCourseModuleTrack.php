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
use App\Observers\StudentCourseModuleTrackObserver;


class StudentCourseModuleTrack extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable, SoftDeletes, StudentCourseModuleTrackObserver;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'student_course_track_id', 'course_module_id',
        'status'
    ];


    protected $appends = array('status_text');
    protected $touches = ['studentCourseTrack'];


    public function getStatusTextAttribute()
    {
        $text = '';
        switch($this->status){
            case 0:
                $text = 'Started';
            break;
            case 1:
                $text = 'Completed';
            break;
        }
        return $text;
    }





    public function studentCourseTrack()
    {
        return $this->belongsTo('App\StudentCourseTrack');
    }

    public function courseModule()
    {
        return $this->belongsTo('App\CourseModule');
    }


}
