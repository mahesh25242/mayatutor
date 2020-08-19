import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from '../register/register/register.component';


const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    data:{
      type: 'student'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
