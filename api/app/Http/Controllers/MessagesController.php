<?php

namespace App\Http\Controllers;

#use App\Events\MessageWasComposed;
use App\User;
use Carbon\Carbon;
use Lexx\ChatMessenger\Models\Message;
use Lexx\ChatMessenger\Models\Participant;
use Lexx\ChatMessenger\Models\Thread;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Validator;

class MessagesController extends Controller
{



    /**
     * Show all of the message threads to the user.
     *
     * @return mixed
     */
    public function index()
    {
        // All threads, ignore deleted/archived participants
        // $threads = Thread::getAllLatest()->get();

        // All threads that user is participating in
        $threads = Thread::forUser(Auth::id())->withCount(["messages", "messages as unread_count" => function($q){
            $q->join("participants" , "participants.thread_id", "=", "messages.thread_id")
            ->where("participants.user_id", Auth::id())
            ->whereNull("participants.deleted_at")
            ->whereRaw(" ( ".\DB::getTablePrefix()."messages.updated_at > ".\DB::getTablePrefix()."participants.last_read
            OR ".\DB::getTablePrefix()."participants.last_read IS NULL) ");
        }])->latest('updated_at')->get();

        // All threads that user is participating in, with new messages
        // $threads = Thread::forUserWithNewMessages(Auth::id())->latest('updated_at')->get();

        return response($threads);
    }

    public function sentItem(Request $request){
        $threads = Thread::forUser(Auth::id())->withCount(["messages", "messages as unread_count" => function($q){
            $q->join("participants" , "participants.thread_id", "=", "messages.thread_id")
            ->where("participants.user_id", Auth::id())
            ->whereNull("participants.deleted_at")
            ->whereRaw(" ( ".\DB::getTablePrefix()."messages.updated_at > ".\DB::getTablePrefix()."participants.last_read
            OR ".\DB::getTablePrefix()."participants.last_read IS NULL) ");
        }])->whereHas("messages", function($q){
            $q->where("user_id", Auth::id());
        })->latest('updated_at')->get();

        // All threads that user is participating in, with new messages
        // $threads = Thread::forUserWithNewMessages(Auth::id())->latest('updated_at')->get();

        return response($threads);
    }
    /**
     * Shows a message thread.
     *
     * @param $id
     * @return mixed
     */
    public function show($id)
    {
        $userId = Auth::id();
        try {
            $thread = Thread::findOrFail($id);

            $thread = Thread::with(["messages.user.studentCourse.course" =>  function ($q) use($thread, $userId) {
                $q->whereIn("user_id",  $thread->participantsUserIds($userId));
            }, "participants.user"])->findOrFail($id);
        } catch (ModelNotFoundException $e) {

            return response(['message' => 'no message found',  'status' => false], 422);
        }

        // show current user in list if not a current participant
        // $users = User::whereNotIn('id', $thread->participantsUserIds())->get();

        // don't show the current user in list

        // $users = User::whereNotIn('id', $thread->participantsUserIds($userId))->get();

        $thread->markAsRead($userId);

        $thread->creator = $thread->creator();

        //$thread->creator = User;
        return response($thread);
        //return view('messenger.show', compact('thread', 'users'));
    }

    /**
     * Stores a new message thread.
     *
     * @return mixed
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'recipients' => ['required'],
            'subject' => ['required'],
            'message' => ['required'],
        ]);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }

        $input = $request->all();

        $thread = Thread::create([
            'subject' => $input['subject'],
        ]);

        // Message
        $message = Message::create([
            'thread_id' => $thread->id,
            'user_id' => Auth::id(),
            'body' => $input['message'],
        ]);

        // Sender
        Participant::create([
            'thread_id' => $thread->id,
            'user_id' => Auth::id(),
            'last_read' => new Carbon,
        ]);

        // Recipients
        if ($request->has('recipients')) {
            // add code logic here to check if a thread has max participants set
            // utilize either $thread->getMaxParticipants()  or $thread->hasMaxParticipants()

            if(is_array($input['recipients']) && !empty($input['recipients'])){
                foreach($input['recipients'] as $recipients){
                    if(isset($recipients["id"]) && $recipients["id"])
                        $thread->addParticipant($recipients["id"]);
                }
            }

        }

        // check if pusher is allowed
        if (config('chatmessenger.use_pusher')) {
            $this->oooPushIt($message);
        }

        return response([ 'message' => 'successfully sent data!', 'status' => true,
    "m" => "This tutor will respond immediately."]);
    }

    /**
     * Adds a new message to a current thread.
     *
     * @param $id
     * @return mixed
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => ['required'],
            'message' => ['required'],
        ]);


        if($validator->fails()){
            return response(['message' => 'Validation errors', 'errors' =>  $validator->errors(), 'status' => false], 422);
        }

        try {
            $thread = Thread::findOrFail($request->input("id", 0));
        } catch (ModelNotFoundException $e) {

            return response(['message' => 'no message found',  'status' => false], 422);
        }

        // Restore all participants within a thread that has a new message.
        // we do not need it since when we remove a participant we do not wish the user to receive the message
        // $thread->activateAllParticipants();

        // Message
        $message = Message::create([
            'thread_id' => $thread->id,
            'user_id' => Auth::id(),
            'body' => $request->input('message', ''),
        ]);

        // Add replier as a participant
        $participant = Participant::firstOrCreate([
            'thread_id' => $thread->id,
            'user_id' => Auth::id(),
        ]);
        $participant->last_read = new Carbon;
        $participant->save();

        $thread->activateAllParticipants();
        // Recipients
        if ($request->has('recipients')) {
            // add code logic here to check if a thread has max participants set
            // utilize either $thread->getMaxParticipants()  or $thread->hasMaxParticipants()

            $thread->addParticipant($request->get('recipients'));
        }



        // check if pusher is allowed
        if (config('chatmessenger.use_pusher')) {
            $this->oooPushIt($message);
        }

        return response($thread);
    }

    /**
     * Send the new message to Pusher in order to notify users.
     *
     * @param Message $message
     * @return void
     */
    protected function oooPushIt(Message $message, $html = '')
    {
        $thread = $message->thread;
        $sender = $message->user;

        $data = [
            'thread_id' => $thread->id,
            'div_id' => 'thread_' . $thread->id,
            'sender_name' => $sender->name,
            'thread_url' => route('messages.show', ['id' => $thread->id]),
            'thread_subject' => $thread->subject,
            'message' => $message->body,
            'html' => $html,
            'text' => str_limit($message->body, 50),
        ];

        $recipients = $thread->participantsUserIds();
        if (count($recipients) > 0) {
            foreach ($recipients as $recipient) {
                if ($recipient == $sender->id) {
                    continue;
                }

                // previous way of doing it
                // $pusher_resp = Pusher::trigger(['for_user_' . $recipient], 'new_message', $data);

                // new way of doing it
                event(new MessageWasComposed($recipient, $data));

                // We're done here - how easy was that, it just works!
            }
        }
    }

    /**
     * Mark a specific thread as read, for ajax use.
     *
     * @param $id
     */
    public function read($id)
    {
        $thread = Thread::find($id);
        if (!$thread) {
            abort(404);
        }

        $thread->markAsRead(Auth::id());
    }

    /**
     * Get the number of unread threads, for ajax use.
     *
     * @return array
     */
    public function unread()
    {
        $count = Auth::user()->unreadMessagesCount();

        return ['msg_count' => $count];
    }

    public function removeParticipant(Request $request){
        $thread = Thread::find($request->input("id", 0));
        $thread->removeParticipant(Auth::id());
        return response([ 'message' => 'successfully remove participant!', 'status' => true]);
    }
}
