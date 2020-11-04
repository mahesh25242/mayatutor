import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerModuleModule } from '../../../shared-module/player-module.module';
import { TeacherInfoBlockComponent } from './components/teacher-info-block/teacher-info-block.component';
@NgModule({
  declarations: [

  TeacherInfoBlockComponent],
  imports: [
    CommonModule,
    PlayerModuleModule
  ],
  exports:[
    TeacherInfoBlockComponent
  ]
})
export class TeacherSharedModule { }
