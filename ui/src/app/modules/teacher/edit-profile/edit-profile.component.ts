import { Component, OnInit, OnDestroy } from '@angular/core';
import { CountryService, StateService, CityService, UserService } from 'src/app/lib/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Country, State, City, User } from 'src/app/lib/interfaces';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import Notiflix from "notiflix";
import { BreadCrumbsService } from 'src/app/shared-module/components/bread-crumbs/bread-crumbs.component';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  loggedUser$: Observable<User>;
  editProfileFrm: FormGroup;
  countries$:Observable<Country[]>;
  states$:Observable<State[]>;
  cities$:Observable<City[]>;
  faYoutube = faYoutube;


  countrySubscription: Subscription;
  stateSubscription: Subscription;
  changePassCheckSubScr: Subscription;
  constructor(private countryService: CountryService,
    private stateService: StateService,
    private cityService: CityService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private breadCrumbsService: BreadCrumbsService) { }

    get f() { return this.editProfileFrm.controls; }
  ngOnInit(): void {



    this.editProfileFrm = this.formBuilder.group({
      fname: [null, [ Validators.required]],
      lname:[null, [Validators.required]],
      email: [{ value: null, disabled: true}, [Validators.required]],
      phone: [{ value: null, disabled: true}, [Validators.required]],
      address: [null, [Validators.required]],
      password: [{ value: null, disabled: true}, [Validators.required]],
      password_confirmation: [{ value: null, disabled: true}, [Validators.required]],
      country_id: [null, [Validators.required]],
      state_id: [null, [Validators.required]],
      city_id: [null, [Validators.required]],
      pin: [null, [Validators.required]],
      isChanegPassword: [false, []],
      payment: this.formBuilder.group({
        account_name:[null, []],
        account_number:[null, []],
        ifsc_code:[null, []],
        bank_name:[null, []],
        qr_code1:[null, []],
        qr_code2:[null, []],
      }),
      info: this.formBuilder.group({
        subject:[null, []],
        expieriance:[null, []],
        time:[null, []],
        education:[null, []],
        fees:[null, []],
        other:[null, []]
      })
    });



    this.countries$ = this.countryService.countries();
    this.countrySubscription = this.f.country_id.valueChanges.subscribe(res=>{
      this.states$ = this.stateService.states(res.id);
    });

    this.stateSubscription = this.f.state_id.valueChanges.subscribe(res=>{
      this.cities$ = this.cityService.cities(res.id);
    });

    this.changePassCheckSubScr = this.f.isChanegPassword.valueChanges.subscribe(res=>{
      if(res){
        this.f.password.enable();
        this.f.password_confirmation.enable();
      }else{
        this.f.password.disable();
        this.f.password_confirmation.disable();
      }

    })

    this.loggedUser$ = this.userService.getloggedUser.pipe(map(res=>{
      if(res){
        this.breadCrumbsService.bcs$.next([
          {
            url: '/',
            name: 'Home',
          },
          {
            name: `Edit ${ res.fname } Profile`,
          }
        ]);

        this.editProfileFrm.patchValue({
          fname: res.fname,
          lname: res.lname,
          phone: res.phone,
          email: res.email,
          address: res.address,
          country_id: res.country,
          state_id: res.state,
          city_id: res.city,
          pin: res.pin,
          payment: {
            account_name: res.teacher_payment_info?.account_name,
            account_number: res.teacher_payment_info?.account_number,
            ifsc_code: res.teacher_payment_info?.ifsc_code,
            bank_name: res.teacher_payment_info?.bank_name,
            qr_code1: res.teacher_payment_info?.qr_code1,
            qr_code2: res.teacher_payment_info?.qr_code2
          },
          info:{
            subject: res.subject,
            expieriance: res.teacher_info?.experiance,
            time: res.teacher_info?.time,
            education: res.teacher_info?.education,
            fees: res.teacher_info?.fees,
            other: res.teacher_info?.other
          }
        });
      }

      return res;
    }));

  }

  onFileInput(files: FileList){
    Notiflix.Block.Merge({svgSize:'20px',});
    Notiflix.Block.Dots(`.avatar-img`);


    const formData = new FormData();
    formData.append('avatharImg', files.item(0));
    //avatar-img
    this.userService.updateAvatar(formData).pipe(mergeMap(res=>{
      return this.userService.authUser();
    })).subscribe(res=>{
      Notiflix.Notify.Success(`Successfully changed avathar `);
      Notiflix.Block.Remove(`.avatar-img`);
    }, error=>{
      Notiflix.Notify.Failure(`Sorry image can't be uploaded `);
      Notiflix.Block.Remove(`.avatar-img`);
    });
  }
  updateProfile(){
    Notiflix.Loading.Pulse(`${(this.f.fname.value) ? this.f.fname.value : ''} please wait`);


    const postData = {
      fname: this.f.fname.value,
      lname: this.f.lname.value,
      email:  this.f.email.value,
      address: this.f.address.value,
      password: null,
      password_confirmation: null,
      country_id: this.f.country_id.value,
      state_id: this.f.state_id.value,
      city_id: this.f.city_id.value,
      pin: this.f.pin.value,
      isChanegPassword:false,
      payment: this.f.payment.value,
      info: this.f.info.value
    }
    if(this.f.isChanegPassword.value){
      postData.password = this.f.password.value;
      postData.password_confirmation = this.f.password_confirmation.value;
      postData.isChanegPassword =true;
    }
    this.userService.updateProfile(postData).pipe(mergeMap(res=>{
      return this.userService.authUser().pipe(map(user=> res));
    })).subscribe(res=>{
      Notiflix.Loading.Remove();
      Notiflix.Notify.Success(`Successfully updated `);

      this.editProfileFrm.patchValue({
        isChanegPassword: false,
        password: null,
        password_confirmation: null
      });
    }, error=>{
      for(let result in this.editProfileFrm.controls){
        if(error.error.errors[result]){
          this.editProfileFrm.controls[result].setErrors({ error: error.error.errors[result] });
        }else{
          this.editProfileFrm.controls[result].setErrors(null);
        }
      }
      Notiflix.Loading.Remove();
    })

  }
  ngOnDestroy(){
    if(this.changePassCheckSubScr){
      this.changePassCheckSubScr.unsubscribe();
    }
    if(this.stateSubscription){
      this.stateSubscription.unsubscribe();
    }
    if(this.countrySubscription){
      this.countrySubscription.unsubscribe();
    }
  }
}
