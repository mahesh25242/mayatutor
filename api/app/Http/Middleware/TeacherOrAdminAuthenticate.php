<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use Cache;
use Carbon\Carbon;
class TeacherOrAdminAuthenticate
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
            if(Auth::user()->has("isAdmin") || Auth::user()->has("isTeacher"))
                return $next($request);
       }
       return redirect()->guest('/');
    }
}
