<?php

namespace App\Events;

class DeletePlanPurchaseEvent extends Event
{
    var $userPlan;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($userPlan=null)
    {
        $this->userPlan = $userPlan;
    }
}
