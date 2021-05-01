import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { empty, Observable, Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { PlanPurchase, UserPlan } from '../lib/interfaces';
import { TeacherService } from "../lib/services";
import { saveAs } from 'file-saver';
import Notiflix from "notiflix";


@Component({
  selector: 'app-purchase-landing',
  templateUrl: './purchase-landing.component.html',
  styleUrls: ['./purchase-landing.component.scss']
})
export class PurchaseLandingComponent implements OnInit, OnDestroy {

  userPlan$: Observable<PlanPurchase>;
  downloadSubScr: Subscription;
  constructor(private teacherService : TeacherService,
    private route: ActivatedRoute ) { }

    download(planPurchase:PlanPurchase=null){
      Notiflix.Block.Circle('a.download');
      this.downloadSubScr = this.teacherService.downloadInvoice(planPurchase.user_plan.id).subscribe(response=>{
        Notiflix.Block.Remove('a.download');
        saveAs(response, `${planPurchase.user_plan.created_at}.pdf`)
      }, error=>{
        Notiflix.Block.Remove('a.download');
        Notiflix.Notify.Failure(`file not found `);
      });

    }

  ngOnInit(): void {
    this.userPlan$ = this.route.params.pipe(mergeMap(parms=>{
      if(parms?.id)
        return this.teacherService.payemntSuccess(parms?.id)
      else
        return empty();
    }))
  }

  ngOnDestroy(){
    this.downloadSubScr && this.downloadSubScr.unsubscribe();
  }

}
