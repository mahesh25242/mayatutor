import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from '../../shared-module/shared-module.module';
import { PlayerModuleModule } from '../../shared-module/player-module.module';

import { TeacherSharedModule } from '../teacher/teacher-shared/teacher-shared.module';
import {  StudentRoutingModule } from './student-routing.module';
import { StudentHomeComponent } from './student-home.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CourseComponent } from './course/course.component';
import { CourseResolver } from './course/course-resolver';

@NgModule({
  declarations: [StudentHomeComponent, DashBoardComponent, EditProfileComponent, CourseComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    StudentRoutingModule,
    TeacherSharedModule,
    PlayerModuleModule
  ],
  providers:[
    CourseResolver
  ]
})
export class StudentModule { }
