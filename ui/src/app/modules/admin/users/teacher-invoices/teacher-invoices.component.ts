import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { User, UserPlan } from 'src/app/lib/interfaces';
import { TeacherService } from 'src/app/lib/services';
import { saveAs } from 'file-saver';
import Notiflix from "notiflix";
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-teacher-invoices',
  templateUrl: './teacher-invoices.component.html',
  styleUrls: ['./teacher-invoices.component.scss']
})
export class TeacherInvoicesComponent implements OnInit, OnDestroy {

  private isSaved$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  @Input() user: User;
  userplans$: Observable<UserPlan[]>;
  subscrDownload: Subscription;
  subscrDelete: Subscription;
  constructor(public modal: NgbActiveModal,
    private teacherService: TeacherService) { }

  download(userPlan: UserPlan = null){
    this.subscrDownload = this.teacherService.downloadInvoice(userPlan.id).subscribe(response=>{
      saveAs(response, `${userPlan.created_at}.pdf`)
    }, error=>{
      Notiflix.Notify.Failure(`file not found `);
    });

  }

  deletePurchase(userPlan: UserPlan = null){
    Notiflix.Block.Merge({svgSize:'20px',});
    Notiflix.Block.Dots(`.delete-user-inv-${userPlan.id}`);

    Notiflix.Confirm.Show('Delete?', "Are you sure you want to delete?", 'Yes', 'No', () => {
      this.subscrDelete = this.teacherService.deletePurchase(userPlan.id).subscribe(res=>{
      this.isSaved$.next(true);
      Notiflix.Block.Remove(`.delete-user-inv-${userPlan.id}`);
      Notiflix.Notify.Success(res?.message);
    }, err=>{
      Notiflix.Block.Remove(`.delete-user-inv-${userPlan.id}`);
    });

    }, () => {
      Notiflix.Block.Remove(`.delete-user-inv-${userPlan.id}`);
    } )


  }
  ngOnInit(): void {
    this.userplans$ = this.isSaved$.asObservable().pipe(mergeMap(res=> this.teacherService.invoices(this.user.id)));
  }
  ngOnDestroy(){
    this.subscrDownload && this.subscrDownload.unsubscribe();
    this.subscrDelete && this.subscrDelete.unsubscribe();
  }

}
