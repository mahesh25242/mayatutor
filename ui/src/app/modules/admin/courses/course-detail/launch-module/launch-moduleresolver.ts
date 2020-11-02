import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot  } from '@angular/router';
import { empty, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseService } from '../../../../../lib/services';

@Injectable()
export class LaunchModuleResolver implements Resolve<any> {

  constructor(
    private courseService: CourseService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {

console.log(route.params)
    return this.courseService.module(route.params.id, route.params.moduleId);


  }
}
