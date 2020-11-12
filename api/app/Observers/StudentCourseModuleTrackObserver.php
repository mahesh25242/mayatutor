<?php

namespace App\Observers;

use App\StudentCourseModuleTrack;
use Illuminate\Support\Facades\Auth;


trait StudentCourseModuleTrackObserver
{

    protected static function boot() {
        parent::boot();

        static::creating(function($studentCourseModuleTrack){

        });
    }

}
