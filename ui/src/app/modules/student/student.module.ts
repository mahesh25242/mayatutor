import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  StudentRoutingModule } from './student-routing.module';
import { DashBoardComponent } from './dash-board/dash-board.component';

@NgModule({
  declarations: [DashBoardComponent],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
