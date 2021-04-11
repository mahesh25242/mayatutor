import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  isAdminRoute$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  constructor(private http: HttpClient) { }

  sentContact(postData: any = null){
    return this.http.post("/sentContact", postData);
  }
}
