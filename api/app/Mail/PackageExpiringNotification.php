<?php
namespace App\Mail;
use Illuminate\Mail\Mailable;
use App\User;
class PackageExpiringNotification extends Mailable
{
    /**
     * Build the message.
     *
     * @return $this
     */
    public $user;
    public function __construct(User $user)
    {
        $this->user = $user;
    }



    public function build()
    {
        return $this->view('email/packageExpiringNotification', ["user" => $this->user]);
    }
}
