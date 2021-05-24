<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class TeacherStudent extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable, SoftDeletes;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'teacher_user_id', 'user_id', 'status'
    ];
    protected $appends = array('created_at_human');

    public function getCreatedAtHumanAttribute()
    {
        return $this->created_at->diffForHumans();
    }


    public function student()
    {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }

    public function scopeThisTeacherStudent($query, $teacher_user_id = 0)
    {
        $teacher_user_id = ($teacher_user_id) ? $teacher_user_id : Auth::id();
        return $query->where('teacher_user_id', $teacher_user_id)->first();
    }

    public function teacher()
    {
        return $this->belongsTo('App\User', 'teacher_user_id');
    }

}
