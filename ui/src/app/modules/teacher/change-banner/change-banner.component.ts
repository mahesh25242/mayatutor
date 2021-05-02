import { Component, Input, OnInit } from '@angular/core';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import {faFacebook, faWhatsapp, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { UserService, TeacherService } from 'src/app/lib/services';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/lib/interfaces';
import { map, mergeMap } from 'rxjs/operators';
import Notiflix from "notiflix";
import { result } from 'lodash';

@Component({
  selector: 'app-change-banner',
  templateUrl: './change-banner.component.html',
  styleUrls: ['./change-banner.component.scss']
})
export class ChangeBannerComponent implements OnInit {
  @Input() teacher: any;

  isChangeable: boolean = false;
  faWhatsapp = faWhatsapp;
  faFacebook  = faFacebook;
  faLinkedin  = faLinkedin;
  faTelegram  = faTelegram;
  faCopy =faCopy;
  user$: Observable<User>;


  constructor(private userService: UserService,
    private teacherService: TeacherService) { }

  ngOnInit(): void {


    if(this.teacher && !(this.teacher instanceof Observable)){
      this.user$ = of(this.teacher).pipe(mergeMap(res=>{
        return this.userService.getloggedUser.pipe(map(usr=>{
          if(usr?.role_url == 'admin'){
            this.isChangeable = true;
          }
          return res;
        }))
      }));
    }else if(this.teacher && this.teacher instanceof Observable){
      this.user$ = this.teacher.pipe(mergeMap(res=>{
        return this.userService.getloggedUser.pipe(map(usr=>{
          if(['admin', 'teacher'].includes(usr?.role_url)){
            this.isChangeable = true;
          }
          return res;
        }))
      }));
    }else{

      this.user$ = this.userService.getloggedUser.pipe(map(res=>{
        if(res?.role_url == 'teacher'){
          this.isChangeable = true;
        }
        return res;
      }));
    }
  }

  changeBanner(files: FileList, user:User = null){
    Notiflix.Block.Merge({svgSize:'20px',});
    Notiflix.Block.Dots(`.banner`);


    const formData = new FormData();
    formData.append('img', files.item(0));
    formData.append('id', `${user.id}`);

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
