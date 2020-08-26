import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AuthGuard, NegateAuthGuard } from '../../lib/guard';
import { RegisterComponent } from 'src/app/shared-module/components/register/register.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NegateAuthGuard],
    data:{
      type: 'student'
    }
  },
  {
    path: 'home',
    component: DashBoardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
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
export class StudentRoutingModule { }
