import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot  } from '@angular/router';
import { Observable } from 'rxjs';
import { TeacherService } from '../../../lib/services';
@Injectable()
export class ListTeachersResolver implements Resolve<any> {

  constructor(
    private teacherService: TeacherService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {


console.log(route.params)
    const place = (route.params[0] != 'null') ? route.params[0] : '';
    const phone = (route.params[1] != 'null') ? route.params[1] : '';

    return this.teacherService.searchTeachers(route.params.q, 1, place, phone);
  }
}
