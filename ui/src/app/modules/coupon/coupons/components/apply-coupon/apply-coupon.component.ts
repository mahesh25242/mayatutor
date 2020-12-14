import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CouponService } from '../../../services';
import Notiflix from "notiflix";
import { Coupon, CouponWithPagination } from '../../../interfaces';

@Component({
  selector: 'app-apply-coupon',
  templateUrl: './apply-coupon.component.html',
  styleUrls: ['./apply-coupon.component.scss']
})
export class ApplyCouponComponent implements OnInit, OnDestroy {
  coupon: Coupon ;
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
