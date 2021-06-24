<?php

namespace App\Listeners;

use App\Events\PlanPurchaseEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Barryvdh\DomPDF\Facade as PDF;
use App\Mail\InvoiceMail;
use Mail;
use Illuminate\Http\Request;

class PlanPurchaseListener
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
    public function handle(PlanPurchaseEvent $event)
    {

        $fromDate = null;

        if($event->planPurchase->user->currentUserPlan ){
            $fromDate = \Carbon\Carbon::parse($event->planPurchase->user->currentUserPlan->end_date);
        }else{
            $fromDate = \Carbon\Carbon::now();
        }

        $userPlan = null;
        if($event->planPurchase->id && $event->planPurchase->status){
            $toDate = clone $fromDate;
            $userPlan = new \App\UserPlan;
            $userPlan->user_id = $event->planPurchase->user_id;
            $userPlan->plan_id = $event->planPurchase->plan_id;
            $userPlan->start_date = $fromDate;
            $userPlan->end_date = $toDate->addDays($event->planPurchase->plan->days);
            $userPlan->plan_purchase_id = $event->planPurchase->id;
            $userPlan->save();
        }
        if($userPlan){

            $pdf = PDF::loadView('PDF.teacherInvoice', array(
                "userPlan" => $userPlan,
                 "request" =>$this->request
            ));
            $pdf->save(public_path("assets/invoices/{$userPlan->id}.pdf"));

            $toEMail = $userPlan->user->email;
            if(env('APP_ENV') == 'local'){
                $toEMail = env('DEVELOPER_MAIL');
            }

            try{
                Mail::to($toEMail)->send(new InvoiceMail($userPlan));
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
                    Mail::to($toEMail)->send(new InvoiceMail($userPlan));
                }catch (\Swift_TransportException $e) {
                    //  echo 'Caught exception: ',  $e->getMessage(), "\n";
                }
            }

        }
    }
}
