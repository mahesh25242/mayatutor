import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Course, CourseModule, User, Rating, Plan } from '../interfaces';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private teacher$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private courses$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>(null);
  constructor(private http: HttpClient) { }

  get courses(){
    return this.courses$.asObservable();
  }
  get teacher() {
    return this.teacher$.asObservable();
  }

  changeBanner(postData: any = null){
    return this.http.post('/teacher/changeBanner', postData);
  }

  topRatedTeacher(){
    return this.http.get<Rating[]>('/teacher/topRatedTeacher');
  }


  updatePaymentQRCode(postData: any = null){
    return this.http.post('/teacher/updatePaymentQRCode', postData);
  }


  plans(){
    return this.http.get<Plan[]>('/teacher/plans');
  }

  listCourses(postData: any = null, url='courses'):Observable<Course[]>{
    return this.http.post<Course[]>(`/teacher/${url}`, postData).pipe(map(res=>{
      this.courses$.next(res);
      return res;
    }));
  }

  searchTeachers(q: string=null){
    return this.http.get<User[]>(`/teacher/search${(q) ? `/${q}` : ``}`);
  }

  getTeacher(teacherUrl:string='',){
    return this.http.get(`/teacher/getaTeacher/${teacherUrl}`).pipe(map(res=>{
      this.teacher$.next(res);
      return res;
    }));
  }
}
