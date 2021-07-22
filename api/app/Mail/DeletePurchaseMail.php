<?php
namespace App\Mail;
use Illuminate\Mail\Mailable;
use App\UserPlan;
class DeletePurchaseMail extends Mailable
{
    /**
     * Build the message.
     *
     * @return $this
     */
    public $userPlan;
    public function __construct($userPlan = null)
    {
        $this->userPlan = $userPlan;
    }



    public function build()
    {
        return $this->view('email/DeletePurchaseMail', ["userPlan" => $this->userPlan]);
    }
}
