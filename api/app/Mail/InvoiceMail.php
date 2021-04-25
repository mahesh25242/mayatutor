<?php
namespace App\Mail;
use Illuminate\Mail\Mailable;
use App\User;
class InvoiceMail extends Mailable
{
    /**
     * Build the message.
     *
     * @return $this
     */
    public $user;
    public $userPlan;
    public function __construct(User $user,  $userPlan = null)
    {
        $this->user = $user;
        $this->userPlan = $userPlan;
    }



    public function build()
    {
        return $this->view('email/InvoiceMail', ["user" => $this->user])
        ->attach(public_path("assets/invoices/{$this->userPlan->id}.pdf"));
    }
}
