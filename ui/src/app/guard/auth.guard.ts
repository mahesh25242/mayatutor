import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService, SettingService } from '../services';
import { map, take, mergeMap, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService,
    private settingService: SettingService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.userService.isAuthinticated().pipe(
        take(1),
        mergeMap((isLoggedIn: boolean)=>{
          return this.settingService.getMaintanceMode().pipe(map(mainMode=>{
            return isLoggedIn;
          }));
        }),
        map((isLoggedIn: boolean) => {

          if (!isLoggedIn) {
            this.router.navigate(['/']);
            return false;
          }
          return true;
        }),
        catchError(x => {
          return this.settingService.isMaintanance$.asObservable().pipe(map(res=>{
            if(res){
              this.router.navigate(['/under-maintenance']);
            }else{
              this.router.navigate(['/']);
            }
            return false;
          }))

        })
      );
     // return this.userService.isAuth();
  }

}
