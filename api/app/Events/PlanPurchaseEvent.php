<?php

namespace App\Events;

class PlanPurchaseEvent extends Event
{
    var $planPurchase;
    var $coupon;
    var $user;
    var $payment;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($plan = null, $coupon = null, $user = null, $payment=null)
    {
        $this->plan = $plan;
        $this->coupon = $coupon;
        $this->user = $user;
        $this->payment = $payment;
    }
}
