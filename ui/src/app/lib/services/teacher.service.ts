import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Course, CourseModule, User, Rating } from '../interfaces';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {


  constructor(private http: HttpClient) { }


  changeBanner(postData: any = null){
    return this.http.post('/teacher/changeBanner', postData);
  }

  topRatedTeacher(){
    return this.http.get<Rating[]>('/teacher/topRatedTeacher');
  }


  updatePaymentQRCode(postData: any = null){
    return this.http.post('/teacher/updatePaymentQRCode', postData);
  }

}
