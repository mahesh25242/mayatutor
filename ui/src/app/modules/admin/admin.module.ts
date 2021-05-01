import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from '../../shared-module/shared-module.module';
import { PlayerModuleModule } from '../../shared-module/player-module.module';
import { TeacherSharedModule } from '../teacher/teacher-shared/teacher-shared.module';

import {  AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CoursesComponent } from './courses/courses.component';
import { CoursesResolver } from './courses/courses-resolver';
import { UsersComponent } from './users/users.component';


import { UsersResolver } from './users/users-resolver';
import { DetailsComponent } from './users/details/details.component';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';0
import { CourseDetailResolver } from './courses/course-detail/course-detail-resolver';
import { LaunchModuleComponent } from './courses/course-detail/launch-module/launch-module.component';
import { LaunchModuleResolver } from './courses/course-detail/launch-module/launch-module.resolver';
import { RejectMessageComponent } from './courses/course-detail/reject-message/reject-message.component';
import { TeacherInvoicesComponent } from './users/teacher-invoices/teacher-invoices.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsResolver } from './settings/settings-resolver';
import { EditSettingComponent } from './settings/edit-setting/edit-setting.component';
import { HomePageBannerComponent } from './settings/home-page-banner/home-page-banner.component';
import { HomePageVideosComponent } from './settings/home-page-videos/home-page-videos.component';
import { EditHomeVideoComponent } from './settings/home-page-videos/edit-home-video/edit-home-video.component';


@NgModule({
  declarations: [AdminHomeComponent, DashBoardComponent,
    EditProfileComponent, CoursesComponent, UsersComponent,
    DetailsComponent, CourseDetailComponent,
    LaunchModuleComponent, RejectMessageComponent,
    TeacherInvoicesComponent,
    SettingsComponent,
    EditSettingComponent,
    HomePageBannerComponent,
    HomePageVideosComponent,
    EditHomeVideoComponent ],
  imports: [
    CommonModule,
    SharedModuleModule,
    AdminRoutingModule,
    PlayerModuleModule,
    TeacherSharedModule
  ],
  providers:[
    CoursesResolver,
    UsersResolver,
    CourseDetailResolver,
    LaunchModuleResolver,
    SettingsResolver
  ]
})
export class AdminModule { }
