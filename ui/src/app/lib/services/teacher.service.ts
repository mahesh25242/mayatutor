import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Course } from '../interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private courses$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>(null);
  constructor(private http: HttpClient) { }

  get courses(){
    return this.courses$.asObservable();
  }
  changeBanner(postData: any = null){
    return this.http.post('/teacher/changeBanner', postData);
  }

  listCourses(postData: any = null){
    return this.http.post<Course[]>('/course/listCourses', postData).pipe(map(res=>{
      this.courses$.next(res);
      return res;
    }));
  }

  createCourse(postData: any = null){
    return this.http.post('/course/createCourse', postData);
  }
}
