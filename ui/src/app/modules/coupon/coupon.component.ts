import { Component, OnInit } from '@angular/core';
import { CouponService } from './services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {


  constructor(public couponService: CouponService,
    private route:ActivatedRoute,) {


  }

  ngOnInit(): void {

  }

}
