import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { TeacherService } from 'src/app/lib/services';
import { BreadCrumbsService } from 'src/app/shared-module/components/bread-crumbs/bread-crumbs.component';
import { Plan } from '../../../lib/interfaces';
@Component({
  selector: 'app-plan-purchase',
  templateUrl: './plan-purchase.component.html',
  styleUrls: ['./plan-purchase.component.scss']
})
export class PlanPurchaseComponent implements OnInit {
  plan$ : Observable<Plan>;
  couponFrm: FormGroup;
  constructor(private teacherService : TeacherService,
    private breadCrumbsService: BreadCrumbsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }


    validateCoupon(){

    }
  ngOnInit(): void {

    this.couponFrm = this.formBuilder.group({
      code: [null, []]
    });

    this.plan$ = this.route.params.pipe(mergeMap(res=>{
      return this.teacherService.plan(res.id).pipe(tap(plan=>{
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
  }

}
