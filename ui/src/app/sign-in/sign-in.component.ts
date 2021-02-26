import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { environment } from '../../environments/environment';
import { UserService } from '../lib/services';
import { empty, Subscription } from 'rxjs';
import Notiflix from "notiflix";
import { mergeMap, map, take, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {faFacebook, faWhatsapp, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  signInFrm: FormGroup;
  invalidlogin:boolean = false;
  signInSubscription: Subscription;
  faFacebook = faFacebook;
  isForgot:boolean = null;
  constructor(private formBuilder: FormBuilder,
    public modal: NgbActiveModal,
    private userService: UserService,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private router: Router) { }

  get f() { return this.signInFrm.controls; }

  ngOnInit(): void {
    this.signInFrm = this.formBuilder.group({
      mobile: ['', [Validators.required]],
      password:['', [Validators.required]]
    });



  }

  refreshToken(){
    this.userService.refreshToken().subscribe();
  }
  signIn(){
    Notiflix.Loading.Pulse(`please wait`);
    this.invalidlogin = false;
    const postData = {
      "grant_type": "password",
      "client_id": 2,
      "client_secret": environment.lumenSecret,
      "password": this.f.password.value,
      "username": this.f.mobile.value,
      "scope": "",
      "recaptcha": null
    };

    this.signInSubscription = this.userService.signIn(postData).pipe(mergeMap(res=>{

      return this.userService.authUser().pipe(mergeMap(user=>{
        return this.userService.setUserLogin({action:'SignIn'}).pipe(map(sRes=>{
          return user
        }))
      }));
    })).subscribe(res=>{

      this.modal.dismiss('cancel click')
      Notiflix.Loading.Remove();
      //this.router.navigate([`/${res.role_url}`]);
    }, error=>{
      Notiflix.Loading.Remove();
        this.invalidlogin = true;
        this.f.password.setValue(null);



    });
    // this.reCaptchaV3Service.execute(environment.recaptchaKey, 'SignUp', (token) => {
    //   postData.recaptcha = token;
    //   this.signInSubscription = this.userService.signIn(postData).subscribe(res=>{
    //     console.log(res)
    //   });
    // }, {
    //     useGlobalDomain: false
    // });

  }

  signInWithGoogle(): void {
      this.userService.GoogleAuth().pipe(
        take(1),
        catchError((error) => {
          console.log(error.message)
          return empty();
        }),
      ).pipe(mergeMap(res=>{
        Notiflix.Loading.Pulse('Please Wait...');
        return this.userService.login(res.credential.toJSON()).pipe(mergeMap(tkn=>{
          return this.userService.authUser().pipe(mergeMap(user=>{
            return this.userService.setUserLogin({action:'SignIn'}).pipe(map(sRes=>{
              return user
            }))
          }))
        }))

      })).subscribe(
        (response) =>{
          this.modal.dismiss('cancel click')
          Notiflix.Loading.Remove();
        }, err=>{
          Notiflix.Loading.Remove();
        }

      );
  }

  signInWithFB(): void {
    this.userService.FBAuth().pipe(
      take(1),
      catchError((error) => {
        console.log(error.message)
        return empty();
      }),
    ).pipe(mergeMap(res=>{
      Notiflix.Loading.Pulse('Please Wait...');
      return this.userService.login(res.credential.toJSON()).pipe(mergeMap(tkn=>{
        return this.userService.authUser().pipe(mergeMap(user=>{
          return this.userService.setUserLogin({action:'SignIn'}).pipe(map(sRes=>{
            return user
          }))
        }))
      }))

    })).subscribe(
      (response) =>{
        this.modal.dismiss('cancel click')
        Notiflix.Loading.Remove();
      }, err=>{
        Notiflix.Loading.Remove();
      }

    );
  }

  showForgotPass(){
    this.isForgot = !this.isForgot;
  }

  signInWithPhone():void{
    this.userService.signInWithPhone();
  }

  ngOnDestroy(){
    if(this.signInSubscription){
      this.signInSubscription.unsubscribe();
    }
  }

}
