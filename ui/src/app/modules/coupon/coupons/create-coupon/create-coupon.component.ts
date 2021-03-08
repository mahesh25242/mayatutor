import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CouponService } from '../../services';
import Notiflix from "notiflix";
import { mergeMap } from 'rxjs/operators';
import { faCalendar, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateINParserFormatter } from '../../../../lib/providers/ngb-date-in-parser-formatter';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Coupon } from '../../interfaces';

@Component({
  selector: 'app-create-coupon',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.scss'],
  providers: [{provide: NgbDateParserFormatter, useClass: NgbDateINParserFormatter}, DatePipe],
})
export class CreateCouponComponent implements OnInit, OnDestroy {
  faCalendar = faCalendar;
  faAngleLeft = faAngleLeft;
  createCouponFrm: FormGroup;
  saveCouponSubScr: Subscription;
  constructor(private formBuilder: FormBuilder,
    private couponService: CouponService,
    private route: ActivatedRoute,
    private router: Router,) { }

  get f(){ return this.createCouponFrm.controls}

  saveCoupon(){
    const postData = {
      id: this.f.id.value,
      no_of_coupon: this.f.no_of_coupon.value,
      groupName: this.f.groupName.value,
      code: this.f.code.value,
      description: this.f.description.value,
      no_use: this.f.no_use.value,
      type: this.f.type.value,
      value: this.f.value.value,
      start_date: this.f.start_date.value,
      end_date: this.f.end_date.value,
      status: this.f.status.value,
    }
    Notiflix.Loading.Pulse();
    this.saveCouponSubScr = this.couponService.saveCoupon(postData).subscribe(res=>{
      Notiflix.Loading.Remove();
      if(this.f.id.value)
        Notiflix.Notify.Success(`Successfully updated coupon`);
      else
        Notiflix.Notify.Success(`Successfully saved coupon `);

      this.router.navigate(['../../'], {relativeTo: this.route});

    }, error=>{
      for(let result in this.createCouponFrm.controls){
        if(error.error.errors[result]){
          console.log(result)
          this.createCouponFrm.controls[result].setErrors({ error: error.error.errors[result] });
        }else{
          this.createCouponFrm.controls[result].setErrors(null);
        }
      }

      Notiflix.Loading.Remove();
    })
  }

  ngOnInit(): void {
    this.createCouponFrm = this.formBuilder.group({
      id: [null, []],
      no_of_coupon: [1, []],
      groupName: [null, []],
      code: [null, []],
      description: [null, []],
      no_use: [null, []],
      type: ['%', []],
      value: [null, []],
      start_date: [null, []],
      end_date: [null, []],
      status: [1, []],
    });

    if(this.route.snapshot.data["coupon"]){
      const coupon:Coupon = this.route.snapshot.data["coupon"];

      this.createCouponFrm.patchValue({
        id: coupon.id,
        no_of_coupon: coupon.coupon_group.no_of_coupon,
        groupName: coupon.coupon_group.name,
        code: coupon.code,
        description: coupon.description,
        no_use: coupon.no_use,
        type: coupon.type,
        value: coupon.value,
        start_date: coupon.start_date_arr,
        end_date: coupon.end_date_arr,
        status: coupon.status,
      });

      this.f.no_of_coupon.disable();
    }

  }

  ngOnDestroy(){
    this.saveCouponSubScr && this.saveCouponSubScr.unsubscribe();
  }
}
