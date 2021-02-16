import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CouponWithPagination } from '../interfaces';
import { CouponService } from '../services';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {
  coupons$: Observable<CouponWithPagination>
  constructor(private couponService: CouponService) { }

  ngOnInit(): void {
    this.coupons$ = this.couponService.coupons;
  }

}
