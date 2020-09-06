<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;

class CourseModule extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'course_id', 'name', 'pdf', 'video_url',
         'sort_order', 'status'
    ];

    public function getPdfAttribute($pdf)
    {
        return (($pdf) ? url().'/assets/course/'.$pdf : '');
    }


    public function course()
    {
        return $this->belongsTo('App\Course');
    }

}
