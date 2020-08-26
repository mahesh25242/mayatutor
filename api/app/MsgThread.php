<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;
use Carbon\Carbon;

class MsgThread extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable, SoftDeletes;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'subject'
    ];

    public function messages()
    {
        return $this->hasMany("App\MsgThreadMessage", 'msg_thread_id', 'id');
    }

    public function getLatestMessageAttribute()
    {
        return $this->messages()->latest()->first();
    }

    public function participants()
    {
        return $this->hasMany('App\MsgThreadMessageParticipant', 'msg_thread_id', 'id');
    }

    public function users()
    {
        return $this->belongsToMany('App\User', 'App\MsgThreadMessageParticipant', 'msg_thread_id', 'user_id');
    }

    public function creator()
    {
        $firstMessage = $this->messages()->withTrashed()->oldest()->first();
        return $firstMessage->user;
    }
    public static function getAllLatest()
    {
        return static::latest('updated_at');
    }

    public static function getBySubject($subject)
    {
        return static::where('subject', 'like', $subject)->get();
    }

    /**
     * Returns an array of user ids that are associated with the thread.
     *
     * @param null|int $userId
     *
     * @return array
     */
    public function participantsUserIds($userId = null)
    {
        $users = $this->participants()->withTrashed()->select('user_id')->get()->map(function ($participant) {
            return $participant->user_id;
        });

        if ($userId !== null) {
            $users->push($userId);
        }

        return $users->toArray();
    }

    public function scopeForUser(Builder $query, $userId)
    {
        return $query->join('msg_thread_message_participants', 'msg_threads.id', '=', 'msg_thread_message_participants.msg_thread_id')
            ->where('msg_thread_message_participants.user_id', $userId)
            ->whereNull('msg_thread_message_participants.deleted_at')
            ->select('msg_threads.*');
    }

    /**
     * Returns threads with new messages that the user is associated with.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $userId
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeForUserWithNewMessages(Builder $query, $userId)
    {

        return $query->join("msg_thread_message_participants", "msg_threads.id", '=', "msg_thread_message_participants.msg_thread_id")
            ->where("msg_thread_message_participants.user_id", $userId)
            ->whereNull("msg_thread_message_participants.deleted_at")
            ->where(function (Builder $query) {
                $query->where('msg_threads.updated_at', '>', "msg_thread_message_participants.last_read")
                    ->orWhereNull("msg_thread_message_participants.last_read");
            })
            ->select('msg_threads.*');
    }

    /**
     * Returns threads between given user ids.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param array $participants
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeBetween(Builder $query, array $participants)
    {
        return $query->whereHas('participants', function (Builder $q) use ($participants) {
            $q->whereIn('user_id', $participants)
                ->select($this->getConnection()->raw('DISTINCT(thread_id)'))
                ->groupBy('thread_id')
                ->havingRaw('COUNT(thread_id)=' . count($participants));
        });
    }

    /**
     * Add users to thread as participants.
     *
     * @param array|mixed $userId
     *
     * @return void
     */
    public function addParticipant($userId)
    {
        $userIds = is_array($userId) ? $userId : (array) func_get_args();

        collect($userIds)->each(function ($userId) {
            \App\MsgThreadMessageParticipant::firstOrCreate([
                'user_id' => $userId,
                'msg_thread_id' => $this->id,
            ]);
        });
    }

    /**
     * Remove participants from thread.
     *
     * @param array|mixed $userId
     *
     * @return void
     */
    public function removeParticipant($userId)
    {
        $userIds = is_array($userId) ? $userId : (array) func_get_args();

        \App\MsgThreadMessageParticipant::where('msg_thread_id', $this->id)->whereIn('user_id', $userIds)->delete();
    }

    /**
     * Mark a thread as read for a user.
     *
     * @param int $userId
     *
     * @return void
     */
    public function markAsRead($userId)
    {
        try {
            $participant = $this->getParticipantFromUser($userId);
            $participant->last_read = new Carbon();
            $participant->save();
        } catch (ModelNotFoundException $e) { // @codeCoverageIgnore
            // do nothing
        }
    }

    /**
     * See if the current thread is unread by the user.
     *
     * @param int $userId
     *
     * @return bool
     */
    public function isUnread($userId)
    {
        try {
            $participant = $this->getParticipantFromUser($userId);

            if ($participant->last_read === null || $this->updated_at->gt($participant->last_read)) {
                return true;
            }
        } catch (ModelNotFoundException $e) { // @codeCoverageIgnore
            // do nothing
        }

        return false;
    }

    /**
     * Finds the participant record from a user id.
     *
     * @param $userId
     *
     * @return mixed
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function getParticipantFromUser($userId)
    {
        return $this->participants()->where('user_id', $userId)->firstOrFail();
    }

    /**
     * Restores all participants within a thread that has a new message.
     *
     * @return void
     */
    public function activateAllParticipants()
    {
        $participants = $this->participants()->withTrashed()->get();
        foreach ($participants as $participant) {
            $participant->restore();
        }
    }

    /**
     * Generates a string of participant information.
     *
     * @param null|int $userId
     * @param array $columns
     *
     * @return string
     */
    public function participantsString($userId = null, $columns = ['name'])
    {
        $participantsTable = Models::table('participants');
        $usersTable = Models::table('users');
        $userPrimaryKey = Models::user()->getKeyName();

        $selectString = $this->createSelectString($columns);

        $participantNames = $this->getConnection()->table($usersTable)
            ->join($participantsTable, $usersTable . '.' . $userPrimaryKey, '=', $participantsTable . '.user_id')
            ->where($participantsTable . '.thread_id', $this->id)
            ->select($this->getConnection()->raw($selectString));

        if ($userId !== null) {
            $participantNames->where($usersTable . '.' . $userPrimaryKey, '!=', $userId);
        }

        return $participantNames->implode('name', ', ');
    }

    /**
     * Checks to see if a user is a current participant of the thread.
     *
     * @param int $userId
     *
     * @return bool
     */
    public function hasParticipant($userId)
    {
        $participants = $this->participants()->where('user_id', '=', $userId);

        return $participants->count() > 0;
    }

    /**
     * Generates a select string used in participantsString().
     *
     * @param array $columns
     *
     * @return string
     */
    protected function createSelectString($columns)
    {
        $dbDriver = $this->getConnection()->getDriverName();
        $tablePrefix = $this->getConnection()->getTablePrefix();
        $usersTable = Models::table('users');

        switch ($dbDriver) {
        case 'pgsql':
        case 'sqlite':
            $columnString = implode(" || ' ' || " . $tablePrefix . $usersTable . '.', $columns);
            $selectString = '(' . $tablePrefix . $usersTable . '.' . $columnString . ') as name';
            break;
        case 'sqlsrv':
            $columnString = implode(" + ' ' + " . $tablePrefix . $usersTable . '.', $columns);
            $selectString = '(' . $tablePrefix . $usersTable . '.' . $columnString . ') as name';
            break;
        default:
            $columnString = implode(", ' ', " . $tablePrefix . $usersTable . '.', $columns);
            $selectString = 'concat(' . $tablePrefix . $usersTable . '.' . $columnString . ') as name';
        }

        return $selectString;
    }

    /**
     * Returns array of unread messages in thread for given user.
     *
     * @param int $userId
     *
     * @return \Illuminate\Support\Collection
     */
    public function userUnreadMessages($userId)
    {
        $messages = $this->messages()->where('user_id', '!=', $userId)->get();

        try {
            $participant = $this->getParticipantFromUser($userId);
        } catch (ModelNotFoundException $e) {
            return collect();
        }

        if (!$participant->last_read) {
            return $messages;
        }

        return $messages->filter(function ($message) use ($participant) {
            return $message->updated_at->gt($participant->last_read);
        });
    }

    /**
     * Returns count of unread messages in thread for given user.
     *
     * @param int $userId
     *
     * @return int
     */
    public function userUnreadMessagesCount($userId)
    {
        return $this->userUnreadMessages($userId)->count();
    }
}
