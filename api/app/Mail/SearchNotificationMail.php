<?php
namespace App\Mail;
use Illuminate\Mail\Mailable;
use App\User;
class SearchNotificationMail extends Mailable
{
    /**
     * Build the message.
     *
     * @return $this
     */
    public $user;
    public $details;
    public function __construct(User $user, $details= null)
    {
        $this->user = $user;
        $this->details = $details;
    }



    public function build()
    {
        return $this->view('email/sendSearchNotification', ["user" => $this->user, "details" => $this->details]);
    }
}
