import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Course, CourseModule } from '../interfaces';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private courses$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>(null);
  private courseModules$: BehaviorSubject<CourseModule[]> = new BehaviorSubject<CourseModule[]>(null);


  constructor(private http: HttpClient) { }

  get courses(){
    return this.courses$.asObservable();
  }

  get courseModules(){
    return this.courseModules$.asObservable();
  }
  changeBanner(postData: any = null){
    return this.http.post('/teacher/changeBanner', postData);
  }

  listCourses(postData: any = null):Observable<Course[]>{
    return this.http.post<Course[]>('/course/courses', postData).pipe(map(res=>{
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
