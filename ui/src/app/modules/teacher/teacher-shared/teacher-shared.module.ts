import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerModuleModule } from '../../../shared-module/player-module.module';
import { SharedModuleModule } from '../../../shared-module/shared-module.module';

import { TeacherInfoBlockComponent } from './components/teacher-info-block/teacher-info-block.component';
import { TeacherFullInfoBlockComponent } from './components/teacher-full-info-block/teacher-full-info-block.component';
import { SendMessageToTeacherComponent } from './components/send-message-to-teacher/send-message-to-teacher.component';
import { ContactTeacherComponent } from './components/contact-teacher/contact-teacher.component';
import { TeacherReportAbuseComponent } from './components/teacher-report-abuse/teacher-report-abuse.component';
import { MailModule } from '../../mail/mail.module';

@NgModule({
  declarations: [
  TeacherInfoBlockComponent,
  TeacherFullInfoBlockComponent,
  SendMessageToTeacherComponent,
  ContactTeacherComponent,
  TeacherReportAbuseComponent
  ],
  imports: [
    CommonModule,
    PlayerModuleModule,
    SharedModuleModule,
    MailModule
  ],
  exports:[
    TeacherInfoBlockComponent,
    TeacherFullInfoBlockComponent,
    SendMessageToTeacherComponent,
    TeacherReportAbuseComponent
  ]
})
export class TeacherSharedModule { }
