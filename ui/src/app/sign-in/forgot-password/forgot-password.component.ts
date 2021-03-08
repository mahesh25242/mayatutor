import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { UserService } from '../../lib/services';
import { Subscription } from 'rxjs';
import Notiflix from "notiflix";
import { Router } from '@angular/router';
import {faFacebook } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  @Output() showForgotPass = new EventEmitter<any>();
  forgotFrmFrm: FormGroup;
  invalidlogin:boolean = false;
  signInSubscription: Subscription;
  faFacebook = faFacebook;
  constructor(private formBuilder: FormBuilder,
    public modal: NgbActiveModal,
    private userService: UserService,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private router: Router) { }

  get f() { return this.forgotFrmFrm.controls; }

  ngOnInit(): void {
    this.forgotFrmFrm = this.formBuilder.group({
      mobile: ['', [Validators.required]]
    });



  }

  back(){
    this.showForgotPass.emit();
  }
  retrievePassword(){
    Notiflix.Loading.Pulse(`please wait`);
    this.invalidlogin = false;
    const postData = {
      "username": this.f.mobile.value
    };

    this.signInSubscription = this.userService.reterievePassword(postData).subscribe(res=>{

      this.modal.dismiss('cancel click')
      Notiflix.Loading.Remove();
      //this.router.navigate([`/${res.role_url}`]);
    }, error=>{
        Notiflix.Loading.Remove();
        this.invalidlogin = true;


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


  ngOnDestroy(){
    if(this.signInSubscription){
      this.signInSubscription.unsubscribe();
    }
  }

}
