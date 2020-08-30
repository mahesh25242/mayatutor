import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from '../../shared-module/shared-module.module';
import {  StudentRoutingModule } from './student-routing.module';
import { StudentHomeComponent } from './student-home.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [StudentHomeComponent, DashBoardComponent, EditProfileComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    StudentRoutingModule,

  ]
})
export class StudentModule { }
