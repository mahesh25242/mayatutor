import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService, StateService, CityService } from '../../../services';
import { Observable, Subscription } from 'rxjs';
import { Country, State, City} from '../../../interfaces';
import { FormGroup, FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators';
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

  constructor(private route:ActivatedRoute,
    private countryService: CountryService,
    private stateService: StateService,
    private cityService: CityService,
    private formBuilder: FormBuilder,) { }

  get f() { return this.registerFrm.controls; }
  ngOnInit(): void {

    this.registerFrm = this.formBuilder.group({
      fname: [null, []],
      lname:[null, []],
      email: [null, []],
      phone: [null, []],
      address: [null, []],
      password: [null, []],
      cpassword: [null, []],
      country_id: [null, []],
      state_id: [null, []],
      city_id: [null, []],
      pin: [null, []],
      type: [null, []]
    });

    this.countries$ = this.countryService.countries();
    this.countrySubscription = this.f.country_id.valueChanges.subscribe(res=>{
      this.states$ = this.stateService.states(res.id);
    });

    this.stateSubscription = this.f.state_id.valueChanges.subscribe(res=>{
      this.cities$ = this.cityService.cities(res.id);
    });

    this.regTypeSubscription = this.route.data.subscribe(res=>{
      this.f.type.setValue(res.type);
    });
  }

  saveUser(){
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
      cpassword: this.f.cpassword.value,
    }

    console.log(postData)
  }

  ngOnDestroy(){
    if(this.countrySubscription){
      this.countrySubscription.unsubscribe();
    }
    if(this.stateSubscription){
      this.stateSubscription.unsubscribe();
    }
    if(this.regTypeSubscription){
      this.regTypeSubscription.unsubscribe();
    }
  }

}
