import { Component, OnInit } from '@angular/core';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import {faFacebook, faWhatsapp, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { UserService, TeacherService } from 'src/app/lib/services';
import { Observable } from 'rxjs';
import { User } from 'src/app/lib/interfaces';
import { map, mergeMap } from 'rxjs/operators';
import { environment }  from '../../../../environments/environment';
import Notiflix from "notiflix";

@Component({
  selector: 'app-change-banner',
  templateUrl: './change-banner.component.html',
  styleUrls: ['./change-banner.component.scss']
})
export class ChangeBannerComponent implements OnInit {
  faWhatsapp = faWhatsapp;
  faFacebook  = faFacebook;
  faLinkedin  = faLinkedin;
  faTelegram  = faTelegram;
  faCopy =faCopy;
  user$: Observable<User>;
  custmUrl: string;
  constructor(private userService: UserService,
    private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.user$ = this.userService.getloggedUser.pipe(map(res=>{
      this.custmUrl  = `${environment.siteAddress}/${res.url}`;
      return res;
    }));
  }

  changeBanner(files: FileList){
    Notiflix.Block.Merge({svgSize:'20px',});
    Notiflix.Block.Dots(`.banner`);


    const formData = new FormData();
    formData.append('img', files.item(0));

    this.teacherService.changeBanner(formData).pipe(mergeMap(res=>{
      return this.userService.authUser();
    })).subscribe(res=>{
      Notiflix.Notify.Success(`Successfully changed avathar `);
      Notiflix.Block.Remove(`.banner`);
    }, error=>{
      Notiflix.Notify.Failure(`Sorry image can't be uploaded `);
      Notiflix.Block.Remove(`.banner`);
    });
  }

}
