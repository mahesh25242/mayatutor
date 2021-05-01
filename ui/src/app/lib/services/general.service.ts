import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Banner } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  isAdminRoute$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  constructor(private http: HttpClient) { }

  sentContact(postData: any = null){
    return this.http.post("/sentContact", postData);
  }

  getAllBanner(){
    return this.http.get<Banner[]>("/banners");
  }

  saveBanner(postData: any = null){
    return this.http.post("/admin/banners/save", postData);
  }

  deleteBanner(postData: any = null){
    return this.http.post("/admin/banners/delete", postData);
  }


  getAllHomeVideo(){
    return this.http.get<Banner[]>("/videos");
  }

  saveHomeVideo(postData: any = null){
    return this.http.post("/admin/videos/save", postData);
  }

  deleteHomeVideo(postData: any = null){
    return this.http.post("/admin/videos/delete", postData);
  }
}
