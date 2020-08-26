import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from 'src/app/shared-module/components/register/register.component';
import { DashBoardComponent } from '../student/dash-board/dash-board.component';
import { AuthGuard, NegateAuthGuard } from 'src/app/lib/guard';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NegateAuthGuard],
    data:{
      type: 'teacher'
    }
  },
  {
    path: 'home',
    component: DashBoardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'mail',
    loadChildren: () => import('../mail/mail.module').then(m => m.MailModule),
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
