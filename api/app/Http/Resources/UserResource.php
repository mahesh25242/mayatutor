<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class UserResource extends JsonResource
{
    //public $preserveKeys = true;
    public static $wrap = 'user';

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
            'fname' => $this->fname,
            'mname' => $this->mname,
            'lname' => $this->lname,
            $this->mergeWhen(
                (
                    Auth::check() && (
                        (
                            $this->isTeacher()->exists() && $this->currentUserPlan()->exists()
                        ) ||
                        (
                            !$this->isTeacher()->exists()
                        )
                    )
                ), [
                'email' => $this->email,
                'phone' => $this->phone,
                'teacher_payment_info' => $this->whenLoaded('teacherPaymentInfo')
            ]),
            'plan_purchase' => $this->whenLoaded('planPurchase'),
          //  'plan_purchase' => $this->planPurchase,
            'current_user_plan' => $this->whenLoaded('currentUserPlan'),
            'pin' => $this->pin,
            'address' => $this->address,
            'country_id' => $this->country_id,
            'country' => $this->country,
            'state_id' => $this->state_id,
            'state' => $this->state,
            'city_id' => $this->city_id,
            'city' => $this->city,
            'avatar' => $this->avatar,
            'is_able' => $this->is_able,
            'is_online' => $this->is_online,
            'is_social' => $this->is_social,
            'url' => $this->url,

            'rating' => $this->rating,

            'status' => $this->status,
            'student_count' => $this->student_count,
            'subject' => $this->subject,
            'teacher_info' => $this->whenLoaded('teacherInfo'),
            'teacher_banner' => $this->whenLoaded('teacherBanner'),
            'teacher_auto_approval_count' => $this->teacher_auto_approval_count,

            'created_at' => $this->created_at,
            'created_at_human' => $this->created_at_human,
            'updated_at' => $this->updated_at,
            'updated_by' => $this->updated_by,
            'activated_at' => $this->activated_at,
            'created_by' => $this->created_by,
            'deleted_at' => $this->deleted_at,
            'deleted_by' => $this->deleted_by
        ];
    }
}
