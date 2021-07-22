import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, Rating, Plan, CourseWithPagination, UserWithPagination, UserPlan, PlanPurchaseWithPagination } from '../interfaces';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private teacher$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private teachers$: BehaviorSubject<UserWithPagination> = new BehaviorSubject<UserWithPagination>(null);
  private courses$: BehaviorSubject<CourseWithPagination> = new BehaviorSubject<CourseWithPagination>(null);
  private planPurchases$: BehaviorSubject<PlanPurchaseWithPagination> = new BehaviorSubject<PlanPurchaseWithPagination>(null);
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
  get planPurchases(){
    return this.planPurchases$.asObservable();
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
    return this.http.post<any>(`/teacher/plan/${postData.plan}/purchase`, postData);
  }

  listCourses(page:number = 1,postData: any = null, url='course'):Observable<CourseWithPagination>{
    return this.http.post<CourseWithPagination>(`/teacher/${url}${(page) ? `?page=${page}` : ``}`, postData).pipe(map(res=>{
      this.courses$.next(res);
      return res;
    }));
  }

  searchTeachers(q: string=null, page: number = 1, place: string ='', phone: string = ''){
    let url =  '';
    let qparm = null;
    if(q){
      url += `/${q}`;
    }
    if(page){
      qparm = `${(qparm) ? `${qparm}&` : `?`}page=${page}`;
    }
    if(place){
      qparm = `${(qparm) ? `${qparm}&` : `?`}place=${place}`;
    }
    if(phone){
      qparm = `${(qparm) ? `${qparm}&` : `?`}phone=${phone}`;
    }

    return this.http.get<UserWithPagination>(`/teacher/search${url}${qparm}`).pipe(map(res=>{
        if(page > 1){

          let teachers = this.teachers$.getValue();
          let tData = teachers.data;
          let rData = res.data;
          teachers = {...teachers, ...res};
          teachers.data = [...tData, ...rData];
          this.teachers$.next(teachers);
        }else{
          this.teachers$.next(res);
        }

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

  reportAbuse(postData: any = null){
    return this.http.post<any>(`/teacher/reportAbuse`, postData);
  }

  invoices(userId: number = 0){
    return this.http.get<any>(`/teacher/invoices/${userId}`);
  }

  downloadInvoice(invId:number = 0){
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(`/admin/teacher/downloadInvoice/${invId}`, { headers: headers, responseType: 'blob' });
  }

  deletePurchase(invId:number = 0){
    return this.http.post<any>(`/admin/teacher/deletePurchase/${invId}`, null);
  }

  payemntSuccess(id: number = 0){
    return this.http.get<any>(`/teacher/payment/${id}`);
  }

  purchases(){
    return this.http.get<any>(`/admin/teacher/purchases`).pipe(tap(res=>this.planPurchases$.next(res)));
  }
}
