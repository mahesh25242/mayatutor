import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { SharedModuleModule } from '../../shared-module/shared-module.module';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    SharedModuleModule
  ],
  exports:[
    RegisterComponent
  ]
})
export class RegisterModule { }
