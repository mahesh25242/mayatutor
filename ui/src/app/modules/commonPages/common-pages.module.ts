import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { SharedModuleModule } from '../../shared-module/shared-module.module';
import { CommonPagesRoutingModule } from './common-pages-routing.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    CommonPagesRoutingModule
  ],
  exports:[
    RegisterComponent
  ],
  bootstrap:[
    RegisterComponent
  ]
})
export class CommonPagesModule { }
