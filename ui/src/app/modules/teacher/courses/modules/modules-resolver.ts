import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot  } from '@angular/router';
import { Observable } from 'rxjs';
import { TeacherService } from '../../../../lib/services';
@Injectable()
export class ModulesResolver implements Resolve<any> {

  constructor(
    private teacherService: TeacherService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.teacherService.listModules(route.params.courseId);
  }
}
