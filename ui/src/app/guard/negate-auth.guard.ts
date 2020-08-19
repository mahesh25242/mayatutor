import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, map, catchError } from 'rxjs/operators';
import { UserService } from '../services';
@Injectable({
  providedIn: 'root'
})
export class NegateAuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.userService.isAuthinticated().pipe(
        take(1),
        map((isLoggedIn: boolean) => {

          if (isLoggedIn) {
            this.router.navigate(['/home']);
            return false;
          }
          return true;
        }),
        catchError((err: Response) => {

          // navigate to login page
         // this.router.navigate(['/']);
           // handle the error by throwing statusText into the console
          //return throwError(false);
          return of(true);
       })
      );
  }

}
