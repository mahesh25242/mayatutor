<?php

namespace App\Events;

class CourseModuleEvent extends Event
{
    var $studentCourseModuleTrack;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($studentCourseModuleTrack)
    {
        $this->studentCourseModuleTrack = $studentCourseModuleTrack;
    }
}
