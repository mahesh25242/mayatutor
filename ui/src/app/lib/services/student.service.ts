import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  addStudent(postData: any = null){
    return this.http.post("/student/addStudent", postData);
  }

  deleteStudent(postData: any = null){
    return this.http.post("/student/deleteStudent", postData);
  }

  toggleStatus(postData: any = null){
    return this.http.post("/student/toggleStatus", postData);
  }

}
