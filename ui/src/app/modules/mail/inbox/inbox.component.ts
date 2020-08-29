import { Component, OnInit, OnDestroy } from '@angular/core';
import { MailService } from '../services/mail.service';
import { Thread } from '../interfaces/index';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import Notiflix from "notiflix";

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit, OnDestroy {
  inboxFrm: FormGroup;
  deleteSubscr: Subscription;
  mails$: Observable<Thread[]>;
  constructor(private mailService: MailService,
    private formBuilder: FormBuilder) { }

    get mailArr() {
      return this.inboxFrm.get('mailArr') as FormArray;
   }
   getControls(stat) {
    return stat.controls;
  }
  ngOnInit(): void {
    this.inboxFrm = this.formBuilder.group({
      mailArr:this.formBuilder.array([]),
    });

    this.mails$ = this.mailService.mails.pipe(map(mail =>{

      const mailArray = <FormArray>this.inboxFrm.controls.mailArr;
      mailArray.controls = [];
      if(mail){
        mail.map((x) =>{

          mailArray.push(this.formBuilder.group({
            id: x.id,
            created_at: x.created_at,
            deleted_at: x.deleted_at,
            updated_at: x.updated_at,
            subject: x.subject,
            messages_count: x.messages_count,
            unread_count: x.unread_count,
            selected: new FormControl(false)
          }));

        });
      }
      return mail;
    }));
  }

  deleteMail(mail){
    Notiflix.Confirm.Show('Delete?', "Are you sure you want to delete?", 'Yes', 'No', () => {
      this.deleteSubscr = this.mailService.removeParticipant({id: mail.id.value}).subscribe();
    }, () => {

    } )
  }

  ngOnDestroy(){
    if(this.deleteSubscr){
      this.deleteSubscr.unsubscribe();
    }
  }
}
