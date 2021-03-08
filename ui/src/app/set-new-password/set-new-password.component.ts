import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from '../lib/services';
import Notiflix from "notiflix";

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss']
})
export class SetNewPasswordComponent implements OnInit, OnDestroy {
  setNePassFrm: FormGroup;
  invalidKey: boolean = false;
  setPas$: Observable<any>;
  setPassSubScr: Subscription;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService:UserService,
    private router: Router
) { }

  get f(){
    return this.setNePassFrm.controls;
  }
  ngOnInit(): void {
    this.setNePassFrm = this.formBuilder.group({
      key: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirm_password: [null, [Validators.required]]
    });

    this.setPas$ = this.route.params.pipe(tap(res=>{
      this.f.key.setValue(res?.key);
    }))
  }

  setNewPassword(){
    const postData = {
      key: this.f.key.value,
      password: this.f.password.value,
      password_confirmation: this.f.confirm_password.value,
    };
    Notiflix.Block.Pulse("#set-new-pass");
    this.setPassSubScr = this.userService.setNewPassword(postData).subscribe(res=>{
      Notiflix.Block.Remove("#set-new-pass");
      Notiflix.Notify.Success(`Successfully changed password`);
      this.router.navigate([`/`]);
    }, error=>{
      Notiflix.Block.Remove("#set-new-pass");
      for(let result in this.setNePassFrm.controls){
        if(error.error.errors[result]){
          this.setNePassFrm.controls[result].setErrors({ error: error.error.errors[result] });
        }else{
          this.setNePassFrm.controls[result].setErrors(null);
        }
      }

    });

  }

  ngOnDestroy(){
    this.setPassSubScr && this.setPassSubScr.unsubscribe();
  }
}
