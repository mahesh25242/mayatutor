import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot  } from '@angular/router';
import { empty, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseService } from '../../../../lib/services';

@Injectable()
export class CourseDetailResolver implements Resolve<any> {

  constructor(
    private courseService: CourseService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {


    return this.courseService.course(route.params.id);


  }
}
