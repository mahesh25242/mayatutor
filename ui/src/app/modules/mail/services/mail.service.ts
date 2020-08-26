import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MsgThreadMessageParticipant, MsgThread } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  inbox(postData: any = null){
    return this.http.post<MsgThread[]>("/mail/inbox", postData);
  }

  sentItem(postData: any = null){
    return this.http.post<MsgThreadMessageParticipant[]>("/mail/sentItem", postData);
  }

  readMail(postData: any = null){
    return this.http.post<MsgThread>("/mail/readMail", postData);
  }

  send(postData: any = null){
    return this.http.post("/mail/send", postData);
  }
}
