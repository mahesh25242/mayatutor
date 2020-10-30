import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentCourse } from '../interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StudentCourseService {
  private studentCourse$: BehaviorSubject<StudentCourse[]> = new BehaviorSubject<StudentCourse[]>(null);
  constructor(private http: HttpClient) { }

  get studentCourse(){
    return this.studentCourse$.asObservable();
  }

  studentCourses(postData: any = null): Observable<StudentCourse[]>{
    return this.http.post<StudentCourse[]>("/student/course", postData).pipe(tap(res=> this.studentCourse$.next(res)));
  }

  allMyCourses(postData: any = null): Observable<StudentCourse[]>{
    return this.http.post<StudentCourse[]>("/student/course/allMyCourses", postData).pipe(tap(res=> this.studentCourse$.next(res)));
  }

  toggleStatus(postData: any = null){
    return this.http.post("/student/course/toggleStatus", postData);
  }

  deleteCourse(postData: any = null){
    return this.http.post("/student/course/deleteCourse", postData);
  }

}
