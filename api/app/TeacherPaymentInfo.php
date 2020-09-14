<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

class TeacherPaymentInfo extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable, SoftDeletes;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'account_name', 'account_number',
        'ifsc_code', 'bank_name', 'qr_code1',
        'qr_code2'
    ];


    public function getQrCode1Attribute($qrCode)
    {
        return (($qrCode) ? url().'/assets/teacher/'.$qrCode : '');
    }

    public function getQrCode2Attribute($qrCode)
    {
        return (($qrCode) ? url().'/assets/teacher/'.$qrCode : '');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }



}
