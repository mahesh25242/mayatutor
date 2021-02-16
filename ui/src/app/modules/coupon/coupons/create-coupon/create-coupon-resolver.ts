import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot  } from '@angular/router';
import { Observable } from 'rxjs';
import { CouponService } from '../../services';
@Injectable()
export class CreateCouponResolver implements Resolve<any> {

  constructor(
    private couponService: CouponService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = (route.params.id) ? route.params.id : '';
    return this.couponService.getACoupon(id);

  }
}
