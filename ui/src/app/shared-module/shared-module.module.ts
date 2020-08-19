import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
  ],
  exports:[
    NgSelectModule,
    SafeHtmlPipe,
    ModalComponent,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModuleModule { }
