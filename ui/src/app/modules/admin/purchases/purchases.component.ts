import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PlanPurchase, PlanPurchaseWithPagination } from 'src/app/lib/interfaces';
import { TeacherService } from 'src/app/lib/services';
import Notiflix from "notiflix";
import { BreadCrumbsService } from 'src/app/shared-module/components/bread-crumbs/bread-crumbs.component';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit, OnDestroy {
  planPurchases$: Observable<PlanPurchaseWithPagination>;
  searchSubScription: Subscription;
  subscrDownload: Subscription;

  constructor(private teacherService: TeacherService,
    private breadCrumbsService: BreadCrumbsService) { }

  search(event = null){
    Notiflix.Block.Dots(`.table`);
    this.searchSubScription = this.teacherService.purchases().subscribe(res=>{
      Notiflix.Block.Remove(`.table`);
    }, err=>{
      Notiflix.Block.Remove(`.table`);
    });
  }

  download(userPlan: PlanPurchase = null){
    if(userPlan?.user_plan?.id){
      this.subscrDownload = this.teacherService.downloadInvoice(userPlan?.user_plan?.id).subscribe(response=>{
        saveAs(response, `${userPlan?.user_plan?.created_at}.pdf`)
      }, error=>{
        Notiflix.Notify.Failure(`file not found `);
      });
    }else{
      if(userPlan.status)
        Notiflix.Notify.Failure(`This is test purchase `);
      else
        Notiflix.Notify.Failure(`This purchase is not success `);
    }

  }


  ngOnInit(): void {
    this.breadCrumbsService.bcs$.next([
      {
        url: '/',
        name: 'Home',
      },
      {
        name: 'Purchases',
      }
    ]);


    this.planPurchases$ = this.teacherService.planPurchases;
  }

  ngOnDestroy(){
    this.searchSubScription && this.searchSubScription.unsubscribe();
    this.subscrDownload && this.subscrDownload.unsubscribe();
  }

}
