import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { State, Course, CourseModule } from '../interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>(null);
  private courseModules$: BehaviorSubject<CourseModule[]> = new BehaviorSubject<CourseModule[]>(null);


  constructor(private http: HttpClient) { }

  get courses(){
    return this.courses$.asObservable();
  }

  get courseModules(){
    return this.courseModules$.asObservable();
  }

  listCourses(postData: any = null):Observable<Course[]>{
    return this.http.post<Course[]>('/admin/courses', postData).pipe(map(res=>{
      this.courses$.next(res);
      return res;
    }));
  }

  course(courseId:number=0):Observable<Course>{
    return this.http.get<Course>(`/course/${courseId}`);
  }

  createCourse(postData: any = null){
    return this.http.post('/course/createCourse', postData);
  }

  deleteCourse(postData: any = null){
    return this.http.post('/course/deleteCourse', postData);
  }


  listModules(courseId:number=0,postData: any = null):Observable<CourseModule[]>{
    return this.http.post<CourseModule[]>(`/course/${courseId}/module/modules`, postData).pipe(map(res=>{
      this.courseModules$.next(res);
      return res;
    }));
  }

  createModule(courseId:number=0,postData: any = null){
    return this.http.post(`/course/${courseId}/module/createModule`, postData);
  }

  deleteModule(courseId:number=0, postData: any = null){
    return this.http.post(`/course/${courseId}/module/deleteModule`, postData);
  }

  orderCourseModule(courseId:number=0, postData: any = null){
    return this.http.post(`/course/${courseId}/module/orderCourseModule`, postData);
  }

}
