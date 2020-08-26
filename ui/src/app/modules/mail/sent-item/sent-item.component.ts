import { Component, OnInit } from '@angular/core';
import { MsgThreadMessageParticipant } from '../interfaces';
import { Observable } from 'rxjs';
import { MailService } from '../services/mail.service';

@Component({
  selector: 'app-sent-item',
  templateUrl: './sent-item.component.html',
  styleUrls: ['./sent-item.component.scss']
})
export class SentItemComponent implements OnInit {

  mails$: Observable<MsgThreadMessageParticipant[]>;
  constructor(private mailService: MailService) { }

  ngOnInit(): void {
    this.mails$ = this.mailService.sentItem();
  }

}
