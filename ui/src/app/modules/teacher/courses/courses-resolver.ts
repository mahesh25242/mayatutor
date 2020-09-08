import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot  } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseService } from '../../../lib/services';
@Injectable()
export class CoursesResolver implements Resolve<any> {

  constructor(
    private courseService: CourseService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.courseService.listCourses();
  }
}
