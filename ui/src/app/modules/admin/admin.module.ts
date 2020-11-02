import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from '../../shared-module/shared-module.module';
import { PlayerModuleModule } from '../../shared-module/player-module.module';

import {  AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CoursesComponent } from './courses/courses.component';
import { CoursesResolver } from './courses/courses-resolver';
import { UsersComponent } from './users/users.component';
import { UsersResolver } from './users/users-resolver';
import { DetailsComponent } from './users/details/details.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CourseDetailResolver } from './courses/course-detail/course-detail-resolver';
import { LaunchModuleComponent } from './courses/course-detail/launch-module/launch-module.component';
import { LaunchModuleResolver } from './courses/course-detail/launch-module/launch-moduleresolver';


@NgModule({
  declarations: [AdminHomeComponent, DashBoardComponent, EditProfileComponent, CoursesComponent, UsersComponent, DetailsComponent, CourseDetailComponent, LaunchModuleComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    AdminRoutingModule,
    PlayerModuleModule
  ],
  providers:[
    CoursesResolver,
    UsersResolver,
    CourseDetailResolver,
    LaunchModuleResolver
  ]
})
export class AdminModule { }
