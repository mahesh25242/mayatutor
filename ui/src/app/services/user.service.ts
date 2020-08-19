import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,public afAuth: AngularFireAuth) { }

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



  signIn(user: any=null){
    return this.http.post<any>('/oauth/token',user);
  }
  refreshToken(){

    let token = localStorage.getItem('token');
    if(token){
      return this.http.post<any>('/refreshToken',{token: token}).pipe(map(x=>{
        return x;
      }))
    }else{
     // return of(false);
      return of({})
    }
  }

}
