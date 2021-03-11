import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from '../../shared-module/shared-module.module';
//import { PlayerModuleModule } from '../../shared-module/player-module.module';


import { AssignedCourseBlockComponent } from './components/assigned-course-block/assigned-course-block.component';

import { TeacherSharedModule } from '../teacher/teacher-shared/teacher-shared.module';
import {  StudentRoutingModule } from './student-routing.module';
import { StudentHomeComponent } from './student-home.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';




@NgModule({
  declarations: [StudentHomeComponent, DashBoardComponent,
     EditProfileComponent,
       AssignedCourseBlockComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    StudentRoutingModule,
    TeacherSharedModule,
   // PlayerModuleModule
  ],
  providers:[
  ]
})
export class StudentModule { }
