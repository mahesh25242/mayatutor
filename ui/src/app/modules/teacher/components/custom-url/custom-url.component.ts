import { Component, Input, OnInit } from '@angular/core';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import {faFacebook, faWhatsapp, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { UserService } from 'src/app/lib/services';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/lib/interfaces';
import { map } from 'rxjs/operators';
import { environment }  from '../../../../../environments/environment';

@Component({
  selector: 'app-custom-url',
  templateUrl: './custom-url.component.html',
  styleUrls: ['./custom-url.component.scss']
})
export class CustomUrlComponent implements OnInit {
  @Input() shareOnly:boolean;
  @Input() user:Observable<User>;
  faWhatsapp = faWhatsapp;
  faFacebook  = faFacebook;
  faLinkedin  = faLinkedin;
  faTelegram  = faTelegram;
  faCopy =faCopy;
  user$: Observable<User>;
  custmUrl: string;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if(this.user){
      this.user$ = this.user.pipe(map(res=>{
        if(res && res?.url)
          this.custmUrl  = `${environment.siteAddress}/${res.url}`;
        return res;
      }));
    }else{
      this.user$ = this.userService.getloggedUser.pipe(map(res=>{
        if(res && res?.url)
          this.custmUrl  = `${environment.siteAddress}/${res.url}`;
        return res;
      }));
    }

  }

}
