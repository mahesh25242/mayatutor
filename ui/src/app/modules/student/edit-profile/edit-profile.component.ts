import { Component, OnInit } from '@angular/core';
import { CountryService, StateService, CityService, UserService } from 'src/app/lib/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Country, State, City } from 'src/app/lib/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  editProfileFrm: FormGroup;
  countries$:Observable<Country[]>;
  states$:Observable<State[]>;
  cities$:Observable<City[]>;

  countrySubscription: Subscription;
  stateSubscription: Subscription;
  constructor(private countryService: CountryService,
    private stateService: StateService,
    private cityService: CityService,
    private formBuilder: FormBuilder,
    private userService: UserService,) { }

    get f() { return this.editProfileFrm.controls; }
  ngOnInit(): void {
    this.editProfileFrm = this.formBuilder.group({
      fname: [null, [ Validators.required]],
      lname:[null, [Validators.required]],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      address: [null, [Validators.required]],
      password: [null, [Validators.required]],
      password_confirmation: [null, [Validators.required]],
      country_id: [null, []],
      state_id: [null, []],
      city_id: [null, [Validators.required]],
      pin: [null, [Validators.required]],
    });

    this.countries$ = this.countryService.countries();
    this.countrySubscription = this.f.country_id.valueChanges.subscribe(res=>{
      this.states$ = this.stateService.states(res.id);
    });

    this.stateSubscription = this.f.state_id.valueChanges.subscribe(res=>{
      this.cities$ = this.cityService.cities(res.id);
    });

  }

}
