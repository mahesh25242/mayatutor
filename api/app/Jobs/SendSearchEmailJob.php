<?php

namespace App\Jobs;


use App\Mail\SearchNotificationMail;
use Mail;


class SendSearchEmailJob extends Job
{

    protected $details;
    public $timeout = 7200; // 2 hours

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($details)
    {
        $this->details = $details;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->details->chunk(100, function ($users) {
            foreach ($users as $user) {
                $email = new SearchNotificationMail($user);
                Mail::to($user->email)->send($email);
            }
          });


    }
}
