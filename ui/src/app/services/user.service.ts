import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from '../interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loggedUser: BehaviorSubject<User> = new BehaviorSubject<User>({});

  constructor(private http: HttpClient,public afAuth: AngularFireAuth) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get getloggedUser() {
    return this.loggedUser.asObservable();
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
      this.loggedIn.next(true);
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
      return this.http.post<any>('/oauth/token',postData).pipe(map(res=>{
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


}
