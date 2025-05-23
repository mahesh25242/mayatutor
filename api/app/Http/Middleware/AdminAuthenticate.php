<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use Cache;
use Carbon\Carbon;
class AdminAuthenticate
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
            if(\App\User::has("isAdmin")->find(Auth::id()))
                return $next($request);
       }
       return response('Unauthorized.', 401);
    }
}
