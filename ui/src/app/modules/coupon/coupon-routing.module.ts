import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthGuard, NegateAuthGuard } from '../../lib/guard';
import { CouponComponent } from './coupon.component';
import { CouponsResolver } from './coupons/coupons-resolver';
import { CouponsComponent } from './coupons/coupons.component';
import { CreateCouponResolver } from './coupons/create-coupon/create-coupon-resolver';
import { CreateCouponComponent } from './coupons/create-coupon/create-coupon.component';



const routes: Routes = [
  {
    path: '',
    component: CouponComponent,
    children:[
      {
        path: '',
        component: CouponsComponent,
        resolve:{
          coupons: CouponsResolver
        }
      },
      {
        path: 'create-coupon/:id',
        component: CreateCouponComponent,
        resolve:{
          coupon: CreateCouponResolver
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponRoutingModule { }
