import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AdminAuthGuard, NegateAuthGuard } from '../../lib/guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AdminHomeComponent } from './admin-home.component';
import { CoursesComponent } from './courses/courses.component';
import { UsersComponent } from './users/users.component';
import { UsersResolver } from './users/users-resolver';
import { CoursesResolver } from './courses/courses-resolver';
import { CourseDetailComponent } from './courses/course-detail/course-detail.component';
import { CourseDetailResolver } from './courses/course-detail/course-detail-resolver';
import { LaunchModuleComponent } from './courses/course-detail/launch-module/launch-module.component';
import { LaunchModuleResolver } from './courses/course-detail/launch-module/launch-module.resolver';


const routes: Routes = [
  {
    path: '',
    component: AdminHomeComponent,
    canActivate: [AdminAuthGuard],
    children:[
      {
        path: '',
        component: DashBoardComponent,
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
      },
      {
        path: 'courses',
        component: CoursesComponent,
        resolve:{
          courses: CoursesResolver
        },
      },
      {
        path: 'courses/:id/detail',
        component: CourseDetailComponent,
        resolve:{
          course: CourseDetailResolver
        },
      },
      {
        path: 'courses/:id/detail/:moduleId/launch',
        component: LaunchModuleComponent,
        resolve:{
          module: LaunchModuleResolver
        },
      },
      {
        path: 'teachers',
        component: UsersComponent,
        canActivate: [AdminAuthGuard],
        data:{
          type: 'teacher'
        },
        resolve:{
          users: UsersResolver
        }
      },
      {
        path: 'students',
        component: UsersComponent,
        canActivate: [AdminAuthGuard],
        data:{
          type: 'student'
        },
        resolve:{
          users: UsersResolver
        }
      },
    ]
  },


  {
    path: 'mail',
    loadChildren: () => import('../mail/mail.module').then(m => m.MailModule),
    canActivate: [AdminAuthGuard],
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
