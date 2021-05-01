<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\UserResource;

class PlanPurchaseResource extends JsonResource
{
    //public $preserveKeys = true;
    //public static $wrap = 'user';

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'amount' => $this->amount,
            'created_at' => $this->created_at,
            'deleted_at' => $this->deleted_at,
            'discount' => $this->discount,
            'id' => $this->id,
            'log' => $this->log,
            'plan_id' => $this->plan_id,
            'status' => $this->status,
            'tax' => $this->tax,
            'tran_no' => $this->tran_no,
            'updated_at' => $this->updated_at,
            'user_id' => $this->user_id,
           'user' => new UserResource($this->user),
           'plan' => $this->plan,
           'user_plan' => $this->userPlan,
        ];
    }
}
