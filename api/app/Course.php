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
        'status', 'live_class', 'live_class_url', 'news', 'sortorder'
    ];

    public function getImageAttribute($image)
    {
        return (($image) ? url().'/assets/course/'.$image : 'assets/tumb.png');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function courseModule()
    {
        return $this->hasMany('App\CourseModule');
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

    public function studentCourse()
    {
        return $this->hasMany('App\StudentCourse');
    }
}
