import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { environment } from '../../environments/environment';

import { UserService } from '../lib/services';
import { Subscription } from 'rxjs';
import Notiflix from "notiflix";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  signInFrm: FormGroup;

  invalidlogin:boolean = false;
  signInSubscription: Subscription;
  constructor(private formBuilder: FormBuilder,
    public modal: NgbActiveModal,
    private userService: UserService,
    private reCaptchaV3Service: ReCaptchaV3Service) { }

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

    this.signInSubscription = this.userService.signIn(postData).subscribe(res=>{
      console.log(res)
      Notiflix.Loading.Remove();
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
      this.userService.GoogleAuth()
  }

  signInWithFB(): void {
    this.userService.FBAuth();
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
