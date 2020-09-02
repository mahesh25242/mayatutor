import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Education } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(private http: HttpClient) { }

  educations(){
    return this.http.get<Education[]>(`/education/getAllEducation`);
  }
}
