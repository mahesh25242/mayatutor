import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentCourse, UserPayment } from '../interfaces';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StudentPaymentService {

  constructor(private http: HttpClient) { }


  payments(postData: any = null): Observable<UserPayment[]>{
    return this.http.post<UserPayment[]>("/student/course/payment", postData);
  }

  createPayment(postData: any = null){
    return this.http.post("/student/course/payment/create", postData);
  }


}
