import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../../shared-module/shared-module.module';
import { TeacherRoutingModule } from './teacher-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModuleModule,
    TeacherRoutingModule,
  ]
})
export class TeacherModule { }
