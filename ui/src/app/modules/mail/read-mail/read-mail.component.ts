import { Component, OnInit } from '@angular/core';
import { MsgThread } from '../interfaces';
import { Observable } from 'rxjs';
import { MailService } from '../services/mail.service';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-read-mail',
  templateUrl: './read-mail.component.html',
  styleUrls: ['./read-mail.component.scss']
})
export class ReadMailComponent implements OnInit {

  mail$: Observable<MsgThread>;
  constructor(private mailService: MailService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.mail$ = this.route.params.pipe(mergeMap(parm=>{
      return this.mailService.readMail({id: parm.id});
    }));
  }

}
