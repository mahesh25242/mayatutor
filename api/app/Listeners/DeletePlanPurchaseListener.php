<?php

namespace App\Listeners;

use App\Events\DeletePlanPurchaseEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Barryvdh\DomPDF\Facade as PDF;
use App\Mail\DeletePurchaseMail;
use Mail;
use Illuminate\Http\Request;

class DeletePlanPurchaseListener
{
    var $request;
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\ExampleEvent  $event
     * @return void
     */
    public function handle(DeletePlanPurchaseEvent $event)
    {



        $toEMail = $event->userPlan->user->email;
        if(env('APP_ENV') == 'local'){
            $toEMail = env('DEVELOPER_MAIL');
        }

        try{
            Mail::to($toEMail)->send(new DeletePurchaseMail($event->userPlan));
        }catch (\Swift_TransportException $e) {
            //  echo 'Caught exception: ',  $e->getMessage(), "\n";
        }

        //mail to super user
        $setting = \App\Setting::where("name", "invoice Copy Mail")->get()->first();
        $toEMail = $setting->value;
        if(env('APP_ENV') == 'local'){
            $toEMail = env('DEVELOPER_MAIL');
        }
        if($toEMail){
            try{
                Mail::to($toEMail)->send(new DeletePurchaseMail($event->userPlan));
            }catch (\Swift_TransportException $e) {
                //  echo 'Caught exception: ',  $e->getMessage(), "\n";
            }
        }

    }
}
