import { Component, OnInit } from '@angular/core';
import { MailService } from '../services/mail.service';
import { Thread } from '../interfaces/index';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  inboxFrm: FormGroup;
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
            participants_count: x.participants_count,
            selected: new FormControl(false)
          }));

        });
      }
      return mail;
    }));
  }

}
