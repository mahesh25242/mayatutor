import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Setting } from '../interfaces';

export interface GoogleObj {
  q: string[];
  target: string;
}

@Injectable({
  providedIn: 'root'
})
export class GoogleTransulateService {
  lang$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  constructor(private http: HttpClient) { }

  get lang(){
    if(!this.lang$.getValue()){
      const lang = localStorage.getItem("lang") ?? 'en';
      this.lang$.next(lang);
    }
    return this.lang$.asObservable();
  }

  googleLanguages(obj: any){
    return this.http.post(`https://translation.googleapis.com/language/translate/v2/languages?key=AIzaSyC528xtYZ3GE13cwBc56c41ASSyfxCvoes`, obj);
  }

  googleTransulate(obj: GoogleObj){
    return this.http.post(`https://translation.googleapis.com/language/translate/v2?key=AIzaSyC528xtYZ3GE13cwBc56c41ASSyfxCvoes`, obj);
  }

  saveLanguage(lang: string = null){
    if(lang){
      localStorage.setItem("lang", lang);
      this.lang$.next(lang);
    }
  }
}
