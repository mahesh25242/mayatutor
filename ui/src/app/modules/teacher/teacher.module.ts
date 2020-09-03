import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareButtonsModule, } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';


import { SharedModuleModule } from '../../shared-module/shared-module.module';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherHomeComponent } from './teacher-home.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import {CustomUrlComponent} from './custom-url/custom-url.component';
import { ChangeBannerComponent } from './change-banner/change-banner.component';
import { PaymentMethodComponent } from './edit-profile/payment-method/payment-method.component';
import { TeacherInfoComponent } from './edit-profile/teacher-info/teacher-info.component';
import { CoursesComponent } from './courses/courses.component';
import { CoursesResolver } from './courses/courses-resolver';
import { AddNewComponent } from './courses/add-new/add-new.component';

@NgModule({
  declarations: [
    TeacherHomeComponent,
    DashBoardComponent,
    EditProfileComponent,
    ChangeBannerComponent,
    CustomUrlComponent,
    PaymentMethodComponent,
    TeacherInfoComponent,
    CoursesComponent,
    AddNewComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    TeacherRoutingModule,
    ShareButtonsModule,
    ShareIconsModule
  ],
  providers:[
    CoursesResolver
  ]
})
export class TeacherModule { }
