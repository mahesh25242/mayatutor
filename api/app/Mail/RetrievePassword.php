<?php
namespace App\Mail;
use Illuminate\Mail\Mailable;
use App\User;
class RetrievePassword extends Mailable
{
    /**
     * Build the message.
     *
     * @return $this
     */
    public $user;
    public $siteAddress;
    public function __construct(User $user, $siteAddress= null)
    {
        $this->user = $user;
        $this->siteAddress = $siteAddress;
    }



    public function build()
    {
        return $this->view('email/retrievePassword',  ["user" => $this->user, "siteAddress" => $this->siteAddress]);
    }
}
