import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Subject as TeachSubject } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  subjects(){
    return this.http.get<TeachSubject[]>(`/subject/getAllSubjects`);
  }
}
