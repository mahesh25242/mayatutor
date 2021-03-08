import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CouponService } from '../../../services';
import Notiflix from "notiflix";
import { Coupon } from '../../../interfaces';

@Component({
  selector: 'app-apply-coupon',
  templateUrl: './apply-coupon.component.html',
  styleUrls: ['./apply-coupon.component.scss']
})
export class ApplyCouponComponent implements OnInit, OnDestroy {
  coupon: Coupon ;
  @Output() setCoupon = new EventEmitter();
  couponFrm: FormGroup;
  couponValidationSubscr: Subscription;
  constructor(private formBuilder: FormBuilder,
    private couponService: CouponService) { }


    validateCoupon(){
      this.coupon = null;
      const postData = {
        code: this.couponFrm.controls.code.value
      }
      this.couponValidationSubscr = this.couponService.validateCoupon(postData).subscribe(res=>{
        this.coupon = res;
        Notiflix.Notify.Success(`Successfully applied`);
        this.setCoupon.emit(this.coupon);
      }, error=>{
        Notiflix.Notify.Failure(`Invalid Coupon code`);
      });
    }
  ngOnInit(): void {

    this.couponFrm = this.formBuilder.group({
      code: [null, []]
    });

  }

  ngOnDestroy(){
    this.couponValidationSubscr && this.couponValidationSubscr.unsubscribe();
  }
}
