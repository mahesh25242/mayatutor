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
    public $siteAddress;
    public $userPlan;
    public function __construct(User $user, $siteAddress= null, $userPlan = null)
    {
        $this->user = $user;
        $this->siteAddress = $siteAddress;
        $this->userPlan = $userPlan;
    }



    public function build()
    {
        return $this->view('email/InvoiceMail', ["user" => $this->user, "siteAddress" => $this->siteAddress])
        ->attach(public_path("assets/invoices/{$this->userPlan->id}.pdf"));
    }
}
