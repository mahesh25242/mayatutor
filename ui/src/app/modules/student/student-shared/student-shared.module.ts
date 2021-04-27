import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseResolver } from './course/course-resolver';
import { CourseComponent } from './course/course.component';
import { CourseModuleComponent } from './course/course-module/course-module.component';
import { SharedModuleModule } from '../../../shared-module/shared-module.module';
import { PlayerModuleModule } from '../../../shared-module/player-module.module';
import { TeacherSharedModule } from '../../teacher/teacher-shared/teacher-shared.module';
import { StudentSharedRoutingModule} from './student-shared-routing.module';

import { LaunchModuleResolver } from './launch-module/launch-module.resolver';
import { LaunchModuleComponent } from './launch-module/launch-module.component';
@NgModule({
  declarations: [
    CourseComponent,
    CourseModuleComponent,
    LaunchModuleComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    PlayerModuleModule,
    TeacherSharedModule,
    StudentSharedRoutingModule
  ],
  providers:[
    CourseResolver,
    LaunchModuleResolver
  ],
  exports:[

  ]
})
export class StudentSharedModule {
  constructor(){

  }
 }
