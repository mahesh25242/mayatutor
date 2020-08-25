import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from '../../shared-module/shared-module.module';
import {  StudentRoutingModule } from './student-routing.module';
import { DashBoardComponent } from './dash-board/dash-board.component';

@NgModule({
  declarations: [DashBoardComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    StudentRoutingModule,

  ]
})
export class StudentModule { }
