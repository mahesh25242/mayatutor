<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;


class CourseModule extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasApiTokens, Authenticatable, Authorizable, SoftDeletes;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'course_id', 'name', 'pdf', 'video_url',
         'sort_order', 'status', 'video_type'
    ];

    protected $appends = array('thumb_image');

    public static function boot() {
        parent::boot();


        static::created(function ($courseModule) {
            \App\CourseApprovalRequest::create(["status" => 0, "course_id" => $courseModule->course->id]);
        });

        static::updated(function ($courseModule) {
            $courseModule->course()->courseApprovalRequest()->update(["status" => 0]);
        });
    }

    public function getPdfAttribute($pdf)
    {
        return (($pdf) ? url("/assets/course/{$this->course_id}/{$pdf}") : '');
    }



    public function getThumbImageAttribute(){
        $url ='';
        switch($this->video_type){
            case 'youtube':
                preg_match('%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i', $this->video_url, $match);
                if(isset($match) && isset($match[1])){
                    $url = 'https://i.ytimg.com/vi/'.$match[1].'/mqdefault.jpg';
                }
            break;
            case 'vimeo':
                if(preg_match("/(https?:\/\/)?(www\.)?(player\.)?vimeo\.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/", $this->video_url, $match)) {
                    if(isset($match) && isset($match[5])){
                        $data = file_get_contents("http://vimeo.com/api/v2/video/{$match[5]}.json");
                        if(isset( $data) &&  $data){
                            $data = json_decode($data, true);
                            $url = (isset($data[0]) && isset($data[0]["thumbnail_medium"])) ? $data[0]["thumbnail_medium"] : '';
                        }
                    }
                }

            break;
        }
        return $url;
    }


    public function course()
    {
        return $this->belongsTo('App\Course');
    }

    public function studentCourseModuleTrack()
    {
        return $this->hasMany('App\StudentCourseModuleTrack');
    }

}
