import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareButtonsModule, } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';


import { SharedModuleModule } from '../../shared-module/shared-module.module';
import { PlayerModuleModule } from '../../shared-module/player-module.module';
import { CouponModule } from '../coupon/coupon.module';

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
import { ModulesComponent } from './courses/modules/modules.component';
import { ModulesResolver } from './courses/modules/modules-resolver';
import { AddModuleComponent } from './courses/modules/add-module/add-module.component';
import { VideoPreviewComponent } from './courses/modules/add-module/video-preview/video-preview.component';
import { PlansComponent } from './plans/plans.component';
import { PlanPurchaseComponent } from './plan-purchase/plan-purchase.component';
import { ListTeachersComponent } from './list-teachers/list-teachers.component';
import {ListTeachersResolver} from './list-teachers/list-teachers-resolver';
import { ContactTeacherComponent } from './dash-board/contact-teacher/contact-teacher.component';
import { StudentsComponent } from './students/students.component';
import { StudentsResolver } from './students/students-resolver';
import { DetailsComponent } from './students/details/details.component';
import { AddStudentComponent } from './students/add-student/add-student.component';
import { StudentPaymentComponent } from './students/student-payment/student-payment.component';
import { AddPaymentComponent } from './students/student-payment/add-payment/add-payment.component';


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
    AddNewComponent,
    ModulesComponent,
    AddModuleComponent,
    VideoPreviewComponent,
    PlansComponent,
    PlanPurchaseComponent,
    ListTeachersComponent,
    ContactTeacherComponent,
    StudentsComponent,
    DetailsComponent,
    AddStudentComponent,
    StudentPaymentComponent,
    AddPaymentComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    TeacherRoutingModule,
    ShareButtonsModule,
    ShareIconsModule,
    PlayerModuleModule,
    CouponModule
  ],
  providers:[
    CoursesResolver,
    ModulesResolver,
    ListTeachersResolver,
    StudentsResolver
  ]
})
export class TeacherModule { }
