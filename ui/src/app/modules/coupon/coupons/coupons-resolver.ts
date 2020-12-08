import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot  } from '@angular/router';
import { Observable } from 'rxjs';
import { CouponService } from '../services';
@Injectable()
export class CouponsResolver implements Resolve<any> {

  constructor(
    private couponService: CouponService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.couponService.listCoupons();

  }
}
