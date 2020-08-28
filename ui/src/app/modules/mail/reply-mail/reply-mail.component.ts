import { Component, OnInit, Input, ViewChild } from '@angular/core';
import Notiflix from "notiflix";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Thread } from '../interfaces';
import { ComposeComponent } from '../compose/compose.component';
import { MailService } from '../services/mail.service';
import { mergeMap, map } from 'rxjs/operators';


@Component({
  selector: 'app-reply-mail',
  templateUrl: './reply-mail.component.html',
  styleUrls: ['./reply-mail.component.scss']
})
export class ReplyMailComponent implements OnInit {
  @ViewChild(ComposeComponent ) composeComponent: ComposeComponent ;

  @Input() mail: Thread;
  constructor(private mailService: MailService,
    public modal: NgbActiveModal) { }


  replyMail(){
    Notiflix.Loading.Pulse(`Sending...`);
    const postData ={
      id: this.mail.id,
      message: this.composeComponent.f.message.value,
    }
    this.mailService.reply(postData).pipe(mergeMap(res=>{
      return this.mailService.readMail(this.mail.id).pipe(map(mail=>{
        return res;
      }));
    })).subscribe(res=>{
      Notiflix.Loading.Remove();
      Notiflix.Notify.Success(`successfully sent message`);
      this.modal.close();
    }, error=>{
      Notiflix.Loading.Remove();
      for(let result in this.composeComponent.composeFrm.controls){
        if(error.error.errors[result]){
          this.composeComponent.composeFrm.controls[result].setErrors({ error: error.error.errors[result] });
        }else{
          this.composeComponent.composeFrm.controls[result].setErrors(null);
        }
      }
    })
  }

  ngOnInit(): void {

  }

}
