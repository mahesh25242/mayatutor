import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from 'src/app/shared-module/components/register/register.component';
import { TeacherHomeComponent } from './teacher-home.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AuthGuard, NegateAuthGuard } from 'src/app/lib/guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CoursesComponent } from './courses/courses.component';
import { CoursesResolver } from './courses/courses-resolver';
import { ModulesComponent } from './courses/modules/modules.component';
import { ModulesResolver } from './courses/modules/modules-resolver';

const routes: Routes = [
  {
    path: '',
    component: TeacherHomeComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path: '',
        component: DashBoardComponent,
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
      },
    ]
  },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [AuthGuard],
    resolve:{
      course: CoursesResolver
    }
  },
  {
    path: 'courses/:courseId/modules',
    component: ModulesComponent,
    canActivate: [AuthGuard],
    resolve:{
      course: ModulesResolver
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NegateAuthGuard],
    data:{
      type: 'teacher'
    }
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
