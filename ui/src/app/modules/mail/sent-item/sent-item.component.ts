import { Component, OnInit } from '@angular/core';
import { Thread } from '../interfaces';
import { Observable } from 'rxjs';
import { MailService } from '../services/mail.service';

@Component({
  selector: 'app-sent-item',
  templateUrl: './sent-item.component.html',
  styleUrls: ['./sent-item.component.scss']
})
export class SentItemComponent implements OnInit {

  mails$: Observable<Thread[]>;
  constructor(private mailService: MailService) { }

  ngOnInit(): void {
    this.mails$ = this.mailService.sentItem();
  }

}
