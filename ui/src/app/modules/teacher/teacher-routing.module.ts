import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from 'src/app/shared-module/components/register/register.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    data:{
      type: 'teacher'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
