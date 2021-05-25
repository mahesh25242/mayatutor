<?php
namespace App\Http\Resources;

use App\Http\Resources\UserResource;
use App\Http\Resources\CourseModuleResource;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class CourseResource extends JsonResource
{
    //public $preserveKeys = true;
    public static $wrap = 'course';

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'course_module_count' => $this->course_module_count,
            'demo_video_url' => $this->demo_video_url,
            'description' => $this->description,
            'image' => $this->image,
            'latest_course_approval_request' => $this->latestCourseApprovalRequest,
            'live_class' => $this->live_class,
            'name' => $this->name,

            $this->mergeWhen(Auth::check() &&
            $this->checkCourseAccess()
            , [
                'live_class_url' => $this->live_class_url,
            ]),
            $this->mergeWhen(
                ($this->latestCourseApprovalRequest->status == 1 ||
                (Auth::check() && (Auth::user()->isAdmin()->exists() || $this->created_by == Auth::user()->id)) ),
                [
                    'course_module' => CourseModuleResource::collection($this->whenLoaded('courseModule')),
                ]
            ),
            'course_tag' => $this->courseTag,
            'isCourseCompleted' => $this->isCourseCompleted,
            'news' => $this->news,
            'price' => $this->price,
            'sortorder' => $this->sortorder,

            'status' => $this->status,
            'user' => new UserResource($this->user),


            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
            'updated_by' => $this->updated_by,
            'created_by' => $this->created_by,
            'deleted_by' => $this->deleted_by,
            'message' => $this->message,
        ];
    }

    private function checkCourseAccess(){
        $isTrue = true;
        if(
            Auth::user()->isStudent()->exists() &&
            !Auth::user()->studentCourse()->where("course_id", $this->course_id)->exists()
        ){
            $isTrue = false;
            $this->message = 'course is not assigned';
        }else if(Auth::user()->studentCourse()->where("course_id", $this->course_id)->exists()){
            $studentCourse = Auth::user()->studentCourse()->where("course_id", $this->course_id)->get()->first();
            if($studentCourse && !$studentCourse->status){
                $this->message = 'This course is temperarly disabled to you. Please contact';
            }else{
                $student = Auth::user()->student()->where("teacher_user_id", $this->course->user_id)->get()->first();
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
