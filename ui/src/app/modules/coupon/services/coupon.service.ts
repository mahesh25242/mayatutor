import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coupon, CouponWithPagination } from '../interfaces';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private coupons$: BehaviorSubject<CouponWithPagination> = new BehaviorSubject<CouponWithPagination>(null);

  constructor(private http: HttpClient) { }

  get coupons(){
    return this.coupons$.asObservable();
  }

  listCoupons(postData: any = null): Observable<CouponWithPagination>{
    return this.http.post<CouponWithPagination>(`/coupons`, postData).pipe(tap(res=>this.coupons$.next(res)));
  }

  saveCoupon(postData: any = null){
    return this.http.post<any>(`/coupons/store`, postData);
  }

  getACoupon(id:number=0){
    return this.http.get<Coupon>(`/coupons/coupon/${id}`);
  }

  validateCoupon(postData: any = null){
    return this.http.post<any>(`/coupons/validateCoupon`, postData);
  }

}
