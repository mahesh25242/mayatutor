import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { User, UserPlan } from 'src/app/lib/interfaces';
import { TeacherService } from 'src/app/lib/services';
import { saveAs } from 'file-saver';
import Notiflix from "notiflix";

@Component({
  selector: 'app-teacher-invoices',
  templateUrl: './teacher-invoices.component.html',
  styleUrls: ['./teacher-invoices.component.scss']
})
export class TeacherInvoicesComponent implements OnInit, OnDestroy {
  @Input() user: User;
  userplans$: Observable<UserPlan[]>;
  subscrDownload: Subscription;
  constructor(public modal: NgbActiveModal,
    private teacherService: TeacherService) { }

    download(userPlan: UserPlan = null){
      this.subscrDownload = this.teacherService.downloadInvoice(userPlan.id).subscribe(response=>{
        saveAs(response, `${userPlan.created_at}.pdf`)
      }, error=>{
        Notiflix.Notify.Failure(`file not found `);
      });
    }
  ngOnInit(): void {
    this.userplans$ = this.teacherService.invoices(this.user.id);
  }
  ngOnDestroy(){
    this.subscrDownload && this.subscrDownload.unsubscribe();
  }

}
