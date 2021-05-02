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
        $q = $this->details["q"];

        $details = [
            "place" => $this->details["place"],
            "phone" => $this->details["phone"],
            "q" => $this->details["q"],
        ];

        $users = \App\User::whereHas("userRole", function ($qry){
            $qry->where("role_id", 2);
        });
        if($q){
            $users = $users->whereHas("course.courseTag",function($qry) use($q){
                $qry->where("tag_name", 'like', "%{$q}%");
            });
        }



        $users->chunk(100, function ($users) use($details) {
            foreach ($users as $user) {
                 $email = new SearchNotificationMail($user,$details);
                 $toEMail = $user->email;
                 if(env('APP_ENV') == 'local'){
                     $toEMail = env('DEVELOPER_MAIL');
                     Mail::to($toEMail)->send($email);
                 }else{
                    Mail::to($user->email)->send($email);
                 }
            }
          });


    }
}
