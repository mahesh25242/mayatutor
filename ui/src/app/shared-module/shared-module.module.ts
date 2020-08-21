import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from '../lib/pipes/safe-html.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';


import { ModalComponent } from './components/modal/modal.component';
@NgModule({
  declarations: [
    SafeHtmlPipe,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    NgSelectModule,
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
    NgxCaptchaModule
  ]
})
export class SharedModuleModule { }
