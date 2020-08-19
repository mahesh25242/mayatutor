import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { RegisterModule } from '../register/register.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    RegisterModule
  ]
})
export class TeacherModule { }
