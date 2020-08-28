import { Component, OnInit } from '@angular/core';
import { MailService } from '../services/mail.service';
import { Observable, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {

  unreadMsgCount$: Observable<{msg_count: null}>;
  constructor(private mailService: MailService) { }

  ngOnInit(): void {
    this.unreadMsgCount$ = timer(0, 5000).pipe(mergeMap(res=>{
      return this.mailService.unread();
    }));
  }

}
