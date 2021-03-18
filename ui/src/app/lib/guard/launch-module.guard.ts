import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { CourseService, SettingService } from '../services';
import { map, take, catchError } from 'rxjs/operators';
import { CourseModule, User } from '../interfaces';
import Notiflix from "notiflix";

@Injectable({
  providedIn: 'root'
})
export class LaunchModuleGuard implements CanActivate {
  constructor(private router: Router, private courseService: CourseService,
    private settingService: SettingService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//      console.log(next.params.moduleId)
      return this.courseService.isLaunchable(next.params.id, next.params.moduleId).pipe(
        take(1),
        map((module: CourseModule) => {

          if (module) {
            return true;
          }
          Notiflix.Notify.Failure('Sorry you cant access it');

          this.router.navigate([`/`]);
          return false;
        }),
        catchError(x => {
          Notiflix.Notify.Failure('Sorry you cant access it');
          return throwError(x);
        })
      );
     // return this.userService.isAuth();
  }

}
