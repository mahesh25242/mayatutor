import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserPlan } from 'src/app/lib/interfaces';
import { TeacherService } from 'src/app/lib/services';
import { saveAs } from 'file-saver';
import Notiflix from "notiflix";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-invoices',
  templateUrl: './my-invoices.component.html',
  styleUrls: ['./my-invoices.component.scss']
})
export class MyInvoicesComponent implements OnInit, OnDestroy {
  invoices: UserPlan[];
  downloadSubScr: Subscription;
  constructor(private route: ActivatedRoute,
    private teacherService: TeacherService) { }

  download(invoice:UserPlan=null){
    this.downloadSubScr = this.teacherService.downloadInvoice(invoice.id).subscribe(response=>{
      saveAs(response, `${invoice.created_at}.pdf`)
    }, error=>{
      Notiflix.Notify.Failure(`file not found `);
    });

  }
  ngOnInit(): void {

    this.invoices = this.route.snapshot.data.invoices;
  }

  ngOnDestroy(){
    this.downloadSubScr && this.downloadSubScr.unsubscribe();
  }

}
