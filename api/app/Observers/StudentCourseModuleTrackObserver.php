<?php

namespace App\Observers;

use App\StudentCourseModuleTrack;
use Illuminate\Support\Facades\Auth;


trait StudentCourseModuleTrackObserver
{

    protected static function boot() {
        parent::boot();

        static::creating(function($studentCourseModuleTrack){
            // $studentCourse = \App\StudentCourse::whereHas("course.courseModule", function($query) use($studentCourseModuleTrack){
            //     $query->where("id", $studentCourseModuleTrack->course_module_id);
            // })
            // ->where("user_id", Auth::id())->exists();
            // if(!$studentCourse){
            //     return false;
            // }
        });
    }

}
