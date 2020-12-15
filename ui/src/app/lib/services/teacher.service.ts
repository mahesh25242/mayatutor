import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Course, CourseModule, User, Rating, Plan, CourseWithPagination, UserWithPagination } from '../interfaces';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private teacher$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private teachers$: BehaviorSubject<UserWithPagination> = new BehaviorSubject<UserWithPagination>(null);
  private courses$: BehaviorSubject<CourseWithPagination> = new BehaviorSubject<CourseWithPagination>(null);
  constructor(private http: HttpClient) { }

  get courses(){
    return this.courses$.asObservable();
  }
  get teacher() {
    return this.teacher$.asObservable();
  }
  get teachers() {
    return this.teachers$.asObservable();
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

  plan(id: number = 0){
    return this.http.get<Plan>(`/teacher/plan/${id}`);
  }

  purchasePlan(postData:any =null){
    return this.http.post(`/teacher/plan/${postData.plan}/purchase`, postData);
  }

  listCourses(page:number = 1,postData: any = null, url='course'):Observable<CourseWithPagination>{
    return this.http.post<CourseWithPagination>(`/teacher/${url}${(page) ? `?page=${page}` : ``}`, postData).pipe(map(res=>{
      this.courses$.next(res);
      return res;
    }));
  }

  searchTeachers(q: string=null, page: number = 1){
    return this.http.get<UserWithPagination>(`/teacher/search${(q) ? `/${q}` : ``}${(page) ? `?page=${page}` : ``}`).pipe(map(res=>{
        this.teachers$.next(res);
        return res;
    }));
  }

  getTeacher(teacherUrl:string=''): Observable<User>{
    return this.http.get<User>(`/teacher/getaTeacher/${teacherUrl}`).pipe(map(res=>{
      this.teacher$.next(res);
      return res;
    }));
  }

  toggleAutoApproval(user: User = null){
    return this.http.post<any>(`/admin/teacher/toggleAutoApproval`, user);
  }

}
