import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  StudentRoutingModule } from './student-routing.module';
import { RegisterModule } from '../register/register.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StudentRoutingModule,
    RegisterModule
  ]
})
export class StudentModule { }
