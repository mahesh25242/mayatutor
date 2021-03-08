import { Component, OnInit } from '@angular/core';
import { Thread } from '../interfaces';
import { Observable } from 'rxjs';
import { MailService } from '../services/mail.service';
import { ActivatedRoute, Data } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReplyMailComponent } from '../reply-mail/reply-mail.component';

@Component({
  selector: 'app-read-mail',
  templateUrl: './read-mail.component.html',
  styleUrls: ['./read-mail.component.scss']
})
export class ReadMailComponent implements OnInit {
  mailTp$: Observable<Data>;
  mail$: Observable<Thread>;
  constructor(private mailService: MailService,
    private route:ActivatedRoute,
    private _modalService: NgbModal) { }

    replayMsg(mail){
      const activeModal = this._modalService.open(ReplyMailComponent, {
        size: 'lg'
      });
      activeModal.componentInstance.mail = mail;
    }

  ngOnInit(): void {
    this.mailTp$ = this.route.data;
    this.mail$ = this.mailService.mail;

  }

}
