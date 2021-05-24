<?php
namespace App\Http\Resources;

use App\Http\Resources\UserResource;
use App\Http\Resources\CourseResource;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class CourseModuleResource extends JsonResource
{
    //public $preserveKeys = true;
    //public static $wrap = 'course';

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [

            'course_id' => $this->course_id,
            'name' => $this->name,
            'sort_order' => $this->sort_order,
            'status' => $this->status,
            'course' => new CourseResource($this->course),

            //'course' => CourseResource::collection($this->whenLoaded('course')),
            $this->mergeWhen(Auth::check() &&
            $this->checkMobuleAccess()
            , [
                'id' => $this->id,
                'thumb_image' => $this->thumb_image,
                'pdf' => $this->pdf,
                'video_type' => $this->video_type,
                'video_url' => $this->video_url,
                'file1' => $this->file1,
                'file2' => $this->file2,
                'logged_student_course' => $this->loggedStudentCourse,
                'student_course_module_track' => $this->studentCourseModuleTrack,
                'is_module_completed' => $this->isModuleCompleted,
                'is_module_completed_count' => $this->is_module_completed_count,
            ]),


            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
            'updated_by' => $this->updated_by,
            'created_by' => $this->created_by,
            'deleted_by' => $this->deleted_by,
            'message' => $this->message,
        ];
    }

    private function checkMobuleAccess(){
        $isTrue = true;
        if(
            Auth::user()->isStudent()->exists() &&
            !Auth::user()->studentCourse()->where("course_id", $this->course_id)->exists()
        ){
            $isTrue = false;
            $this->message = 'course is not assigned';
        }else if(Auth::user()->studentCourse()->where("course_id", $this->course_id)->exists()){
            $studentCourse = Auth::user()->studentCourse()->get()->first();
            if($studentCourse && !$studentCourse->status){
                $this->message = 'This course is temperarly disabled to you. Please contact';
            }else{
                $student = Auth::user()->student()->get()->first();
                if($student){
                    if(!$student->status){
                        $isTrue = false;
                        $this->message = 'This teacher is temperraly disbald you';
                    }
                }else{
                    $this->message = 'You are not the student of this teacher';
                    $isTrue = false;
                }
            }
        }



        return  $isTrue;
    }
}
