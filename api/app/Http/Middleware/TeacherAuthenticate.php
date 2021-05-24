<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use Cache;
use Carbon\Carbon;
class TeacherAuthenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

       if (Auth::check() )
       {
            if(\App\User::has("isTeacher")->find(Auth::id()))
                return $next($request);
       }
       return response('Unauthorized.', 401);
    }
}
