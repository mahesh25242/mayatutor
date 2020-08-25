import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AuthGuard } from '../../lib/guard';
import { RegisterComponent } from 'src/app/shared-module/components/register/register.component';


const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    data:{
      type: 'student'
    }
  },
  {
    path: 'home',
    component: DashBoardComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
