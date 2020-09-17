import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { StudentAuthGuard, NegateAuthGuard } from '../../lib/guard';
import { RegisterComponent } from 'src/app/shared-module/components/register/register.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { StudentHomeComponent } from './student-home.component';


const routes: Routes = [
  {
    path: '',
    component: StudentHomeComponent,
    canActivate: [StudentAuthGuard],
    children:[
      {
        path: '',
        component: DashBoardComponent,
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
      }
    ]
  },
  {
    path: 'mail',
    loadChildren: () => import('../mail/mail.module').then(m => m.MailModule),
    canActivate: [StudentAuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NegateAuthGuard],
    data:{
      type: 'student'
    }
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
