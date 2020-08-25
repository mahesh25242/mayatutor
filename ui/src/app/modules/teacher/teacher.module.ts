import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../../shared-module/shared-module.module';
import { TeacherRoutingModule } from './teacher-routing.module';
import { DashBoardComponent } from './dash-board/dash-board.component';


@NgModule({
  declarations: [
    DashBoardComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    TeacherRoutingModule,
  ]
})
export class TeacherModule { }
