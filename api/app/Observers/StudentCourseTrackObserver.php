<?php

namespace App\Observers;

use App\StudentCourseTrack;
use Illuminate\Support\Facades\Auth;


trait StudentCourseTrackObserver
{

    protected static function boot() {
        parent::boot();

        static::creating(function($studentCourseTrack){
            // $studentCourse = \App\StudentCourse::where("id" , $studentCourseTrack->student_course_id)
            // ->where("user_id", Auth::id())->exists();
            // if(!$studentCourse){
            //     return false;
            // }
        });

        static::deleting(function($studentCourseTrack) {
            $studentCourseTrack->studentCourseModuleTrack()->delete();
        });

    }

}
