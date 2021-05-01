<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;

class Asset extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'description', 'file_path', 'type', 'sort_order'
    ];

    public function getFilePathAttribute($filePath)
    {
        if($this->type == 'banner'){
            return (($filePath) ? url().'/assets/public/banner/'.$filePath : 'assets/banner-default.jpg');
        }else{
            return $filePath;
        }

    }

}
