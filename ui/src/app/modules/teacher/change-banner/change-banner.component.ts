import { Component, Input, OnInit } from '@angular/core';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import {faFacebook, faWhatsapp, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { UserService, TeacherService } from 'src/app/lib/services';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/lib/interfaces';
import { mergeMap } from 'rxjs/operators';
import Notiflix from "notiflix";

@Component({
  selector: 'app-change-banner',
  templateUrl: './change-banner.component.html',
  styleUrls: ['./change-banner.component.scss']
})
export class ChangeBannerComponent implements OnInit {
  @Input() teacher: any;

  faWhatsapp = faWhatsapp;
  faFacebook  = faFacebook;
  faLinkedin  = faLinkedin;
  faTelegram  = faTelegram;
  faCopy =faCopy;
  user$: Observable<User>;


  constructor(private userService: UserService,
    private teacherService: TeacherService) { }

  ngOnInit(): void {


    if(!(this.teacher instanceof Observable))
      this.user$ = of(this.teacher);
    else if(this.teacher instanceof Observable)
      this.user$ = this.teacher;
    else
      this.user$ = this.userService.getloggedUser;
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
