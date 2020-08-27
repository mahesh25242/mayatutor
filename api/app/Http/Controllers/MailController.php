<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use Carbon\Carbon;

class MailController extends Controller
{


    public function inbox(Request $request){
       // return \App\MsgThread::getAllLatest()->get();
       $inbox = \App\MsgThread::forUser(Auth::id())->latest('updated_at')->get();
        //$inbox = \App\MsgThreadMessageParticipant::with(["thread"])->where("user_id", Auth::id())->get();
        return response($inbox);
    }

    public function sentItem(Request $request){
        $inbox = \App\MsgThreadMessage::with(["thread"])->where("user_id", Auth::id())->get();
        return response($inbox);
    }

    public function readMail(Request $request){
        try {
            $thread = \App\MsgThread::with(["messages.user"])->findOrFail($request->input("id", 0));
        } catch (ModelNotFoundException $e) {

        }

        // show current user in list if not a current participant
        // $users = User::whereNotIn('id', $thread->participantsUserIds())->get();

        // don't show the current user in list
        $userId = Auth::id();
        $users = \App\User::whereNotIn('id', $thread->participantsUserIds($userId))->get();

        $thread->markAsRead($userId);
        return response($thread);
    }

    public function send(Request $request){

        $validationField = [
            'message' => ['required', 'string'],
        ];
        if(!$request->input("msg_thread_id", null)){
            $validationField["subject"] = ['required', 'string'];
            $validationField["user"] = ['required'];
        }
        $validator = Validator::make($request->all(),  $validationField);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }

        if($request->input("msg_thread_id", null)){
            $msgThreadMessage = new \App\MsgThreadMessage;
            $msgThreadMessage->msg_thread_id = $request->input("msg_thread_id", null);
            $msgThreadMessage->user_id = Auth::id();
            $msgThreadMessage->body = $request->input("message", '');
            $msgThreadMessage->save();
        }else{
            $msgThread = new \App\MsgThread;
            $msgThread->subject = $request->input("subject", "");
            $msgThread->save();

            $msgThreadMessage = new \App\MsgThreadMessage;
            $msgThreadMessage->msg_thread_id = $msgThread->id;
            $msgThreadMessage->user_id = Auth::id();
            $msgThreadMessage->body = $request->input("message", '');
            $msgThreadMessage->save();


            $msgThreadMessageParticipant = new \App\MsgThreadMessageParticipant;
            $msgThreadMessageParticipant->msg_thread_id = $msgThread->id;
            $msgThreadMessageParticipant->user_id = Auth::id();
            $msgThreadMessageParticipant->save();

            if ($request->input("user", null)) {
                $msgThread->addParticipant($request->input("user", null));
            }

        }

        //$request->input("user", 0)
        return response(['message' => 'successfully sent',  'status' => true]);
    }



}
