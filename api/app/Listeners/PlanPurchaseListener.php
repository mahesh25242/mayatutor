<?php

namespace App\Listeners;

use App\Events\PlanPurchaseEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Barryvdh\DomPDF\Facade as PDF;
use App\Mail\InvoiceMail;
use Mail;

class PlanPurchaseListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\ExampleEvent  $event
     * @return void
     */
    public function handle(PlanPurchaseEvent $event)
    {

        if($event->user->isTeacher()->exists()){


            $fromDate = null;

            if($event->user->currentUserPlan ){
                $fromDate = \Carbon\Carbon::parse($event->user->currentUserPlan->end_date);
            }else{
                $fromDate = \Carbon\Carbon::now();
            }



            if($event->plan){

                $discount = 0;
                if($event->coupon && $event->coupon->id){
                    switch($event->coupon->type){
                        case '%':
                            $discount = ($event->plan->price * ($event->coupon->value / 100));
                        break;
                        default:
                            $discount = $event->coupon->value;
                        break;
                    }

                    $discount = ($discount > $event->plan->price)  ? $event->plan->price : $discount;
                }

                $total = $event->plan->price - $discount;
                // UserPlan
                $planPurchase = new \App\PlanPurchase;
                $planPurchase->user_id = $event->user->id;
                $planPurchase->plan_id = $event->plan->id;
                $planPurchase->amount = $total;
                $planPurchase->discount = $discount;
                $planPurchase->status = ($total) ? 0 : 1;
                if($event->payment){
                    $planPurchase->tran_no = $event->payment["tran_no"];
                    $planPurchase->log = $event->payment["log"];
                }
                $planPurchase->save();

                if($planPurchase->id && $planPurchase->status){
                    $toDate = clone $fromDate;
                    $userPlan = new \App\UserPlan;
                    $userPlan->user_id = $planPurchase->user_id;
                    $userPlan->plan_id = $planPurchase->plan_id;
                    $userPlan->start_date = $fromDate;
                    $userPlan->end_date = $toDate->addDays($event->plan->days);
                    $userPlan->save();
                }
                $pdf = PDF::loadView('PDF.teacherInvoice', array(
                    "user" => $event->user,
                    "plan" => $event->plan,
                    "userPlan" => $userPlan,
                ));
                $pdf->save(public_path("assets/invoices/{$userPlan->id}.pdf"));

                $toEMail = $event->user->email;
                if(env('APP_ENV') == 'local'){
                    $toEMail = env('DEVELOPER_MAIL');
                }

                try{
                    Mail::to($toEMail)->send(new InvoiceMail($event->user,  $request->header("From-Domain")));
                }catch (\Swift_TransportException $e) {
                  //  echo 'Caught exception: ',  $e->getMessage(), "\n";
                }


            }

        }
    }
}
