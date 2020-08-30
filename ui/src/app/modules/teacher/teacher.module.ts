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
import { PaymentMethodComponent } from './edit-profile/payment-method/payment-method.component';

@NgModule({
  declarations: [
    TeacherHomeComponent,
    DashBoardComponent,
    EditProfileComponent,
    CustomUrlComponent,
    PaymentMethodComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    TeacherRoutingModule,
    ShareButtonsModule,
    ShareIconsModule
  ]
})
export class TeacherModule { }
