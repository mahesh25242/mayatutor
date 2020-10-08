import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from '../../shared-module/shared-module.module';
import {  AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CoursesComponent } from './courses/courses.component';
import { CoursesResolver } from './courses/courses-resolver';
import { UsersComponent } from './users/users.component';
import { UsersResolver } from './users/users-resolver';
import { DetailsComponent } from './users/details/details.component';


@NgModule({
  declarations: [AdminHomeComponent, DashBoardComponent, EditProfileComponent, CoursesComponent, UsersComponent, DetailsComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    AdminRoutingModule,

  ],
  providers:[
    CoursesResolver,
    UsersResolver

  ]
})
export class AdminModule { }
