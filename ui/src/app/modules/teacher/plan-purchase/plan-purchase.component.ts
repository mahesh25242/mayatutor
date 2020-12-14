import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { TeacherService } from 'src/app/lib/services';
import { BreadCrumbsService } from 'src/app/shared-module/components/bread-crumbs/bread-crumbs.component';
import { Plan } from '../../../lib/interfaces';
import { Coupon } from '../../coupon/interfaces';
@Component({
  selector: 'app-plan-purchase',
  templateUrl: './plan-purchase.component.html',
  styleUrls: ['./plan-purchase.component.scss']
})
export class PlanPurchaseComponent implements OnInit {
  plan$ : Observable<Plan>;
  private coupon$: BehaviorSubject<Coupon> = new BehaviorSubject<Coupon>(null);

  constructor(private teacherService : TeacherService,
    private breadCrumbsService: BreadCrumbsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }


    setCoupon(coupon){
      this.coupon$.next(coupon);
    }

    goToPurchase(plan: Plan = null){
      this.coupon$.asObservable().pipe()
    }
  ngOnInit(): void {
    this.plan$ = this.coupon$.asObservable().pipe(mergeMap(coupon=>{
      return this.route.params.pipe(mergeMap(res=>{
        return this.teacherService.plan(res.id).pipe(map((plan: Plan) =>{
          let discount: number = 0;
          if(coupon){
            switch(coupon.type){
              case '%':
                discount = plan.price * (coupon.value / 100);
              break;
              default:
                discount =  coupon.value;
              break;
            }
            discount = (discount > plan.price) ? plan.price : discount;
          }
          plan.price = plan.price - discount;
          return plan;
        }),tap(plan=>{
          this.breadCrumbsService.bcs$.next([
            {
              url: '/',
              name: 'Home',
            },
            {
              url: '/teacher/plans',
              name: 'Plans',
            },
            {
              name: `${plan.name}`,
            }
          ]);
        }));
      }));
    }))
  }

}
