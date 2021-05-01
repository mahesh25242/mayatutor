<?php
namespace App\Mail;
use Illuminate\Mail\Mailable;
use App\UserPlan;
class InvoiceMail extends Mailable
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
        return $this->view('email/InvoiceMail', ["userPlan" => $this->userPlan])
        ->attach(public_path("assets/invoices/{$this->userPlan->id}.pdf"));
    }
}
