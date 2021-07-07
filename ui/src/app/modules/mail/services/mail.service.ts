import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThreadMessageParticipant, Thread } from '../interfaces';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { UserWithPagination } from 'src/app/lib/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private mails$: BehaviorSubject<Thread[]> = new BehaviorSubject<Thread[]>(null);
  private mail$: BehaviorSubject<Thread> = new BehaviorSubject<Thread>(null);

  private unreadCnt: number = 0;

  constructor(private http: HttpClient) { }

  get mails(){
    return this.mails$.asObservable();
  }

  get mail(){
    return this.mail$.asObservable();
  }

  inbox(){
    return this.http.get<Thread[]>("/messages").pipe(map(mails=>{
      this.mails$.next(mails);
      return mails;
    }));
  }

  sentItem(postData: any = null){
    return this.http.post<ThreadMessageParticipant[]>("/messages/sentItem", postData);
  }

  readMail(id: number = 0){
    return this.http.get<Thread>(`/messages/${id}`).pipe(map(res=>{
      this.mail$.next(res);
      return res;
    }));
  }

  send(postData: any = null){
    return this.http.post<any>("/messages", postData);
  }

  reply(postData: any = null){
    return this.http.post(`/messages/update`, postData);
  }

  unread(){
    return this.http.get<{msg_count: null}>('/messages/unread').pipe(mergeMap(res=>{

      if(this.unreadCnt !== res.msg_count ){
        this.unreadCnt = res.msg_count;
        return this.inbox().pipe(map(mails=>{
          return res;
        }));
      }else{
        return of(res);
      }
    }))
  }

  removeParticipant(postData: any = null){
    return this.http.post(`/messages/removeParticipant`, postData).pipe(mergeMap(res=>{
      return this.inbox().pipe(map(mails=>{
        return res;
      }));
    }));
  }

  toUser(parm: string=''): Observable<UserWithPagination>{
    return this.http.get<UserWithPagination>(`/messages/toUser${parm}`);
  }
}
