import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,) { }

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
