import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot  } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../../lib/services';
@Injectable()
export class DashBoardResolver implements Resolve<any> {

  constructor(
    private userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.userService.getUser(route.params.teacher);

  }
}
