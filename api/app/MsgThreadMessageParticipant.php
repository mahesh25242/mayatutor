<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

class MsgThreadMessageParticipant extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable, SoftDeletes;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'msg_thread_id', 'user_id', 'last_read'
    ];

    public function thread()
    {
        return $this->belongsTo('App\MsgThread', 'msg_thread_id', 'id');
    }

    /**
     * User relationship.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     *
     * @codeCoverageIgnore
     */
    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }
}
