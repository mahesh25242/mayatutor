import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService, StateService, CityService, UserService } from '../../../lib/services';
import { Observable, Subscription, from } from 'rxjs';
import { Country, State, City} from '../../../lib/interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { environment } from '../../../../environments/environment';
import Notiflix from "notiflix";
import { BreadCrumbsService } from '../bread-crumbs/bread-crumbs.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterTermsComponent } from '../register-terms/register-terms.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerFrm: FormGroup;
  countries$:Observable<Country[]>;
  states$:Observable<State[]>;
  cities$:Observable<City[]>;

  countrySubscription: Subscription;
  stateSubscription: Subscription;
  regTypeSubscription: Subscription;
  signUpSubscription: Subscription;
  acceptTrmPopSubScr: Subscription;

  constructor(private route:ActivatedRoute,
    private countryService: CountryService,
    private stateService: StateService,
    private cityService: CityService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private breadCrumbsService: BreadCrumbsService,
    private _modalService: NgbModal,
    private router: Router) { }

  get f() { return this.registerFrm.controls; }

  viewTerms(){
    const activeModal = this._modalService.open(RegisterTermsComponent,{
      size:'lg'
    });
  }

  ngOnInit(): void {

    this.registerFrm = this.formBuilder.group({
      fname: [null, [ Validators.required]],
      lname:[null, [Validators.required]],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      password: [null, [Validators.required]],
      password_confirmation: [null, [Validators.required]],
      country_id: [null, [Validators.required]],
      state_id: [null, [Validators.required]],
      city_id: [null, [Validators.required]],
      pin: [null, [Validators.required]],
      type: [null, []],
      accept_terms: [false, []],
    });

    this.countries$ = this.countryService.countries();
    this.countrySubscription = this.f.country_id.valueChanges.subscribe(res=>{
      if(res?.id)
        this.states$ = this.stateService.states(res?.id);
    });

    this.stateSubscription = this.f.state_id.valueChanges.subscribe(res=>{
      if(res?.id)
        this.cities$ = this.cityService.cities(res.id);
    });


    this.regTypeSubscription = this.route.data.subscribe(res=>{
      this.breadCrumbsService.bcs$.next([
        {
          url: '/',
          name: 'Home',
        },
        {
          name: `${ res.type.charAt(0).toUpperCase() + res.type.slice(1) } Registration`,
        }
      ]);

      this.f.type.setValue(res.type);
    });
  }



  saveUser(){
    Notiflix.Loading.Pulse(`${(this.f.fname.value) ? this.f.fname.value : ''} please wait`);
    const postData = {
      fname: this.f.fname.value,
      lname: this.f.lname.value,
      email: this.f.email.value,
      phone: this.f.phone.value,
      address: this.f.address.value,
      country_id: this.f.country_id.value,
      state_id: this.f.state_id.value,
      city_id: this.f.city_id.value,
      pin: this.f.pin.value,
      password: this.f.password.value,
      password_confirmation: this.f.password_confirmation.value,
      recaptcha: '',
      type: this.f.type.value,
      accept_terms: this.f.accept_terms.value,
    }
    this.reCaptchaV3Service.execute(environment.recaptchaKey, 'SignUp', (token) => {
      postData.recaptcha = token;
      this.signUpSubscription = this.userService.signUp(postData).subscribe(res=>{
        Notiflix.Loading.Remove();
        this.registerFrm.patchValue({
          fname: null,
          lname: null,
          email: null,
          phone: null,
          address: null,
          password: null,
          password_confirmation: null,
          country_id: null,
          state_id: null,
          city_id: null,
          pin: null,
          accept_terms: null,
        });
        if(res?.m){
          Notiflix.Report.Success('',res?.m,'OK');
        }else{
          Notiflix.Notify.Success(`successfully registered as ${this.f.type.value}`);
        }


        this.router.navigate([`/`]);
      }, error=>{

        Notiflix.Loading.Remove();
        for(let result in this.registerFrm.controls){
          if(error.error.errors[result]){
            this.registerFrm.controls[result].setErrors({ error: error.error.errors[result] });
          }else{
            this.registerFrm.controls[result].setErrors(null);
          }
        }

      });
    }, {
        useGlobalDomain: false
    });



  }

  ngOnDestroy(){
    this.countrySubscription &&  this.countrySubscription.unsubscribe();
    this.stateSubscription && this.stateSubscription.unsubscribe();
    this.regTypeSubscription &&  this.regTypeSubscription.unsubscribe();
    this.signUpSubscription && this.signUpSubscription.unsubscribe();
    this.acceptTrmPopSubScr && this.acceptTrmPopSubScr.unsubscribe();
  }

}
