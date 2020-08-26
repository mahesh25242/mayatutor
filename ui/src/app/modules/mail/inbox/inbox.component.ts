import { Component, OnInit } from '@angular/core';
import { MailService } from '../services/mail.service';
import { MsgThread } from '../interfaces/index';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  mails$: Observable<MsgThread[]>;
  constructor(private mailService: MailService) { }

  ngOnInit(): void {
    this.mails$ = this.mailService.inbox();
  }

}
