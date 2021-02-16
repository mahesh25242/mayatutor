import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentCourse } from '../interfaces';
import { BehaviorSubject, Observable } from 'rxjs';


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
