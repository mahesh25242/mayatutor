import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from '../services';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInFrm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    public modal: NgbActiveModal,
    private userService: UserService) { }

  get f() { return this.signInFrm.controls; }

  ngOnInit(): void {
    this.signInFrm = this.formBuilder.group({
      mobile: ['', []],
      password:['', []]
    });



  }

  signIn(){
    const postData = {
      "grant_type": "password",
      "client_id": 2,
      "client_secret": "OSgBHeQzRuIilHzVw8Ct0e1MaEzdETg0M1WUcBWB",
      "password": this.f.password.value,
      "phone": this.f.mobile.value,
      "scope": "",
    };
    this.userService.signIn(postData).subscribe();
    console.log(postData)
  }

  signInWithGoogle(): void {
      this.userService.GoogleAuth()
  }

  signInWithFB(): void {
    this.userService.FBAuth();
  }



}
