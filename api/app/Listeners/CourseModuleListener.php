<?php

namespace App\Listeners;

use App\Events\CourseModuleEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CourseModuleListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\ExampleEvent  $event
     * @return void
     */
    public function handle(CourseModuleEvent $event)
    {

        if($event->studentCourseModuleTrack){
            $moduleCount = $event->studentCourseModuleTrack->studentCourseTrack->studentCourse->courseModule()->count();
            $passedModule = \App\StudentCourseModuleTrack::where("student_course_track_id", $event->studentCourseModuleTrack->student_course_track_id)
            ->where("status", 1)->count();
            if($moduleCount == $passedModule){
                $studentCourseTrack = \App\StudentCourseTrack::find($event->studentCourseModuleTrack->student_course_track_id);
                $studentCourseTrack->status = 1;
                $studentCourseTrack->save();
            }
        }
    }
}
