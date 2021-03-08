import { Injectable } from '@angular/core';
import { map, shareReplay, catchError, tap } from 'rxjs/operators';
import { of, BehaviorSubject, Observable, throwError, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { Pagination, User, UserWithPagination } from '../interfaces';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private loggedUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    private user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    private users$: BehaviorSubject<UserWithPagination> = new BehaviorSubject<UserWithPagination>(null);

  constructor(private http: HttpClient,public afAuth: AngularFireAuth) { }


  get getloggedUser() {
    return this.loggedUser.asObservable();
  }
  get user() {
    return this.user$.asObservable();
  }
  get users() {
    return this.users$.asObservable();
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  FBAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }


  signInWithPhone(){

    var applicationVerifier = new auth.RecaptchaVerifier(
      'recaptcha-container', { 'size': 'invisible'});
        var provider = new auth.PhoneAuthProvider();
        provider.verifyPhoneNumber('+919995453566', applicationVerifier)
      .then(function(verificationId) {
        var verificationCode = window.prompt('Please enter the verification ' +
            'code that was sent to your mobile device.');
        return auth.PhoneAuthProvider.credential(verificationId,
            verificationCode);
      })
      .then(function(phoneCredential) {
        return auth().signInWithCredential(phoneCredential);
      });
  }
  // Auth logic to run auth providers
  AuthLogin(provider) {
    return from(this.afAuth.signInWithPopup(provider))
  }

  signUp(user: any= null){
    return this.http.post<any>('/signUp',user);
  }

  signIn(user: any=null){
    return this.http.post<any>('/oauth/token',user).pipe(map(res=>{
      this.setLogin(res);
      return res;
    }));
  }


  refreshToken(){

    let token:any = localStorage.getItem('token');
    if(token){
      token = JSON.parse(token);
      const postData = {
        'grant_type' : 'refresh_token',
        'refresh_token' : `${token.refresh_token}`,
        'client_id' : 2,
        'client_secret' : environment.lumenSecret,
        'scope' : '',
      }
      return this.http.post<any>('/oauth/token/refresh',postData).pipe(map(res=>{
        this.setLogin(res);
        return res;
      }))
    }else{
     // return of(false);
      return of({})
    }
  }

  setLogin(loginResponse){
    localStorage.setItem('token', JSON.stringify(loginResponse));
  }

  setUserLogin(postData:any= null){
    return this.http.post('/setUserLogin', postData);
  }

  signOut(){
    return this.http.get<User>('/signOut');
  }


  authUser():Observable<User>{

    return this.http.get<User>('/authUser').pipe(map((x:User)=>{

      switch(_.head(x.role)?.name){
        case 'Teacher':
          x.role_url = 'teacher';
        break;
        case 'Student':
          x.role_url = 'student';
        break;
        case 'Admin':
          x.role_url = 'admin';
        break;
      }
      this.loggedUser.next(x);
      return x;
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
    catchError((err)=>{
     // console.log(x.status)
     localStorage.removeItem('token');
      this.loggedUser.next(null);
      return throwError(err);
    })
    )
  }

  updateProfile(postData:any= null){
    return this.http.post('/updateProfile', postData);
  }

  updateAvatar(postData:any= null){
    return this.http.post('/updateAvatar', postData);
  }


  getUser(teacherUrl:string='', baseUrl: string = null){
    return this.http.get<User>(`/${baseUrl}/fetch/${teacherUrl}`).pipe(map(res=>{
      this.user$.next(res);
      return res;
    }));
  }

  getAllUser(urlPart:string='', page:number= 1,parm: string = ''){
    let qryStr = '';
    if(page){
      qryStr += `?page=${page}`;
    }
    if(parm){

      qryStr += (qryStr && `&${parm}`) || (!qryStr && `?${parm}`);
    }

    return this.http.get<UserWithPagination>(`/${urlPart}/fetchAll${qryStr}`).pipe(map(res=>{
      this.users$.next(res);
      return res;
    }));
  }

  fetchAllStudent(page:number= 1,parm: string = ''){

    let qryStr = '';
    if(page){
      qryStr += `?page=${page}`;
    }
    if(parm){

      qryStr += (qryStr && `&${parm}`) || (!qryStr && `?${parm}`);
    }

    return this.http.get<UserWithPagination>(`/student/fetchAllStudent${qryStr}`);
  }

  toggleStatus(urlPart:string='', user: User= null){
    return this.http.post<any>(`/${urlPart}/toggleStatus`, user);
  }

  deleteUser(urlPart:string='', user: User= null){
    return this.http.post<any>(`/${urlPart}/delete`, user);
  }

  login(postData: any = null){
    return this.http.post<any>(`/login`, postData).pipe(tap(res=>{
      this.setLogin(res);
    }));
  }

  reterievePassword(postData: any = null){
    return this.http.post<any>(`/reterievePassword`, postData);
  }

  setNewPassword(postData: any = null){
    return this.http.post<any>(`/setNewPassword`, postData);
  }

  activateUser(postData: any = null){
    return this.http.post<any>(`/activateUser`, postData);
  }

  resentActivationMail(postData: any = null){
    return this.http.post<any>(`/resentActivationMail`, postData);
  }


}
