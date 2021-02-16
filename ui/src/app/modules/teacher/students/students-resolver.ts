import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot  } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../../lib/services';
@Injectable()
export class StudentsResolver implements Resolve<any> {

  constructor(
    private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.userService.getAllUser('student');
  }
}
