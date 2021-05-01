import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Setting } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  isMaintanance$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private settings$: BehaviorSubject<Setting[]> = new BehaviorSubject<Setting[]>(null);

  constructor(private http: HttpClient) { }

  get settings() {
    return this.settings$.asObservable();
  }

  getSettings(){
    return this.http.get<Setting[]>("/admin/settings").pipe(tap(res=>{
      this.settings$.next(res);
    }));
  }

  saveSetting(postData:any = null){
    return this.http.post<any>("/admin/settings/saveSetting", postData);
  }

}
