<?php

namespace App\Events;

class PlanPurchaseEvent extends Event
{
    var $planPurchase;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($planPurchase=null)
    {
        $this->planPurchase = $planPurchase;
    }
}
