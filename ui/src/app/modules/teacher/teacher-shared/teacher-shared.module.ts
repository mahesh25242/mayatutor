import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerModuleModule } from '../../../shared-module/player-module.module';
import { SharedModuleModule } from '../../../shared-module/shared-module.module';

import { TeacherInfoBlockComponent } from './components/teacher-info-block/teacher-info-block.component';
import { TeacherFullInfoBlockComponent } from './components/teacher-full-info-block/teacher-full-info-block.component';
@NgModule({
  declarations: [
  TeacherInfoBlockComponent,
  TeacherFullInfoBlockComponent
  ],
  imports: [
    CommonModule,
    PlayerModuleModule,
    SharedModuleModule
  ],
  exports:[
    TeacherInfoBlockComponent,
    TeacherFullInfoBlockComponent
  ]
})
export class TeacherSharedModule { }
