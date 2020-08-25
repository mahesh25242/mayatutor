import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from '../lib/pipes/safe-html.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { NgxCaptchaModule } from 'ngx-captcha';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { ModalComponent } from './components/modal/modal.component';
import { TeacherBlockComponent } from './components/teacher-block/teacher-block.component';
@NgModule({
  declarations: [
    SafeHtmlPipe,
    ModalComponent,
    LoginComponent,
    RegisterComponent,
    TeacherBlockComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule
  ],
  exports:[
    NgSelectModule,
    SafeHtmlPipe,
    ModalComponent,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    LoginComponent,
    RegisterComponent,
    TeacherBlockComponent
  ]
})
export class SharedModuleModule { }
