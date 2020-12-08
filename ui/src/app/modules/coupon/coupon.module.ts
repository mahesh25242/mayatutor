import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from '../../shared-module/shared-module.module';

import {  CouponRoutingModule } from './coupon-routing.module';
import { CouponComponent } from './coupon.component';
import { CouponsComponent } from './coupons/coupons.component';
import { CouponsResolver } from './coupons/coupons-resolver';
import { CreateCouponComponent } from './coupons/create-coupon/create-coupon.component';
import { CreateCouponResolver } from './coupons/create-coupon/create-coupon-resolver';

@NgModule({
  declarations: [CouponComponent, CouponsComponent, CreateCouponComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    CouponRoutingModule
  ],
  providers:[
    CouponsResolver,
    CreateCouponResolver
  ]
})
export class CouponModule { }
