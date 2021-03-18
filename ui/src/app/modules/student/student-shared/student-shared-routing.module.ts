import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LaunchModuleGuard } from 'src/app/lib/guard';
import { LaunchModuleComponent } from '../launch-module/launch-module.component';
import { LaunchModuleResolver } from '../launch-module/launch-module.resolver';
import { CourseResolver } from './course/course-resolver';
import { CourseComponent } from './course/course.component';


const routes: Routes = [
  {
    path: ':id',
    component: CourseComponent,
    resolve:{
      course: CourseResolver
    }
  },
  {
    path:':id/launch/:moduleId',
    component: LaunchModuleComponent,
    canActivate: [LaunchModuleGuard],
    resolve:{
      module: LaunchModuleResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentSharedRoutingModule {

constructor(){

}
}
