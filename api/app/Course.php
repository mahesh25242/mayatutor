<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

class Course extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable, SoftDeletes;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'name', 'price', 'demo_video_url', 'image', 'description',
        'status', 'live_class', 'live_class_url', 'news', 'sortorder', 'meeting_url'
    ];

    public static function boot() {
        parent::boot();

        static::deleting(function($course) { // before delete() method call this
             $course->courseModule()->delete();
             $course->courseTag()->delete();
             $course->courseApprovalRequest()->delete();
             $course->studentCourse()->delete();
        });

        static::created(function ($course) {
            if($course->teacherAutoApproval()->exists()){
                \App\CourseApprovalRequest::create(["status" => 1, "course_id" => $course->id]);
            }else{
                \App\CourseApprovalRequest::create(["status" => 0, "course_id" => $course->id]);
            }


        });

        static::updated(function ($course) {
            if($course->teacherAutoApproval()->exists()){
                \App\CourseApprovalRequest::create(["status" => 1, "course_id" => $course->id]);
            }else{
                \App\CourseApprovalRequest::create(["status" => 0, "course_id" => $course->id]);
            }

        });
    }

    public function getImageAttribute($image)
    {
        return (($image) ? url().'/assets/course/'.$image : 'assets/course-banner-default.jpg');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function courseModule()
    {
        return $this->hasMany('App\CourseModule')->orderBy("sort_order", "ASC");
    }

    public function courseTag()
    {
        return $this->hasMany('App\CourseTag');
    }

    public function courseApprovalRequest()
    {
        return $this->hasMany('App\CourseApprovalRequest');
    }

    public function latestCourseApprovalRequest()
    {
        return $this->hasOne('App\CourseApprovalRequest')->latest();
    }

    public function teacherAutoApproval()
    {
        return $this->hasOne('App\TeacherAutoApproval','user_id', 'user_id')->latest();
    }

    public function scopeApproved($query)
    {
        return $query->whereHas('latestCourseApprovalRequest', function($status) {
            $status->where('status',1);
        });
    }


    public function studentCourse()
    {
        return $this->hasMany('App\StudentCourse');
    }

    public function studentCourseChekCompletion()
    {
        return $this->hasMany('App\StudentCourse');
    }

    public function isCourseCompleted()
    {
        return $this->hasOneThrough(
            'App\StudentCourseTrack',
            'App\StudentCourse',
            'course_id', // Foreign key on the StudentCourse table...
            'student_course_id',  // Foreign key on the StudentCourseTrack table...
            'id', // Local key on the Course table...
            'id' // Local key on StudentCourse table...
        );
    }

    // public function studentCourseModule()
    // {
    //     return $this->hasMany('App\StudentCourseModule');
    // }
}
