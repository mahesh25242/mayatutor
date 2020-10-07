import { Injectable } from '@angular/core';
import { map, shareReplay, catchError } from 'rxjs/operators';
import { of, BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from '../interfaces';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private loggedUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    private user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    private users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);

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
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
        console.log('You have been successfully logged in!')
    }).catch((error) => {
        console.log(error)
    })


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
    return this.http.post('/student/updateProfile', postData);
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

  getAllUser(urlPart:string='', parm: string = ''){
    return this.http.get<User[]>(`/${urlPart}/fetchAll${(parm) ? `?${parm}` : ''}`).pipe(map(res=>{
      this.users$.next(res);
      return res;
    }));
  }

  toggleStatus(urlPart:string='', user: User= null){
    return this.http.post<any>(`/${urlPart}/toggleStatus`, user);
  }

  deleteUser(urlPart:string='', user: User= null){
    return this.http.post<any>(`/${urlPart}/delete`, user);
  }


}
