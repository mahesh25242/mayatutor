import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot  } from '@angular/router';
import { Observable } from 'rxjs';
import { MailService } from '../services/mail.service';
@Injectable()
export class InboxResolver implements Resolve<any> {

  constructor(
    private mailService: MailService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.mailService.inbox();

  }
}
