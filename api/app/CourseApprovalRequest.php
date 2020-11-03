<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

class CourseApprovalRequest extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable, SoftDeletes;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'course_id', 'status', 'message'
    ];


    protected $appends = array('status_text');

    public function getStatusTextAttribute()
    {
        $text = '';
        switch($this->status){
            case 0:
                $text = 'New';
            break;
            case 1:
                $text = 'Approved';
            break;
            case 2:
                $text = 'Rejected';
            break;
        }
        return $text;
    }

    public function course()
    {
        return $this->belongsTo('App\Course');
    }
}
