import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-apply-coupon',
  templateUrl: './apply-coupon.component.html',
  styleUrls: ['./apply-coupon.component.scss']
})
export class ApplyCouponComponent implements OnInit {

  couponFrm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }


    validateCoupon(){

    }
  ngOnInit(): void {

    this.couponFrm = this.formBuilder.group({
      code: [null, []]
    });

  }

}
