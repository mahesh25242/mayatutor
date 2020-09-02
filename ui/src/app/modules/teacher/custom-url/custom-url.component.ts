import { Component, OnInit } from '@angular/core';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import {faFacebook, faWhatsapp, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { UserService } from 'src/app/lib/services';
import { Observable } from 'rxjs';
import { User } from 'src/app/lib/interfaces';
import { map } from 'rxjs/operators';
import { environment }  from '../../../../environments/environment';

@Component({
  selector: 'app-custom-url',
  templateUrl: './custom-url.component.html',
  styleUrls: ['./custom-url.component.scss']
})
export class CustomUrlComponent implements OnInit {
  faWhatsapp = faWhatsapp;
  faFacebook  = faFacebook;
  faLinkedin  = faLinkedin;
  faTelegram  = faTelegram;
  faCopy =faCopy;
  user$: Observable<User>;
  custmUrl: string;
  constructor(private userSerivce: UserService) { }

  ngOnInit(): void {
    this.user$ = this.userSerivce.getloggedUser.pipe(map(res=>{
      this.custmUrl  = `${environment.siteAddress}/${res.url}`;
      return res;
    }));
  }

}
