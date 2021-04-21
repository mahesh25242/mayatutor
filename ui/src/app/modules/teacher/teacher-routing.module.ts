import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from 'src/app/shared-module/components/register/register.component';
import { TeacherHomeComponent } from './teacher-home.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { TeacherAuthGuard, NegateAuthGuard } from 'src/app/lib/guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CoursesComponent } from './courses/courses.component';
import { CoursesResolver } from './courses/courses-resolver';
import { ModulesComponent } from './courses/modules/modules.component';
import { ModulesResolver } from './courses/modules/modules-resolver';
import { PlansComponent } from './plans/plans.component';
import { ListTeachersComponent } from './list-teachers/list-teachers.component';
import { ListTeachersResolver } from './list-teachers/list-teachers-resolver';
import { StudentsResolver } from './students/students-resolver';
import { StudentsComponent } from './students/students.component';
import { PlanPurchaseComponent } from './plan-purchase/plan-purchase.component';
import { AdminOrTeacherAuthGuard } from 'src/app/lib/guard/adminOrTeacherAuth.guard';

const routes: Routes = [
  {
    path: '',
    component: TeacherHomeComponent,
    canActivate: [AdminOrTeacherAuthGuard],
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
    canActivate: [TeacherAuthGuard],
    resolve:{
      course: CoursesResolver
    }
  },
  {
    path: 'courses/:courseId/modules',
    component: ModulesComponent,
    canActivate: [TeacherAuthGuard],
    resolve:{
      course: ModulesResolver
    }
  },
  {
    path: 'students',
    component: StudentsComponent,
    canActivate: [TeacherAuthGuard],
    resolve:{
      students: StudentsResolver
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
    path: 'plans',
    component: PlansComponent,
  },
  {
    path: 'plans/:id',
    component: PlanPurchaseComponent,
  },

  {
    path: 'lookups/:q',
    component: ListTeachersComponent,
    resolve:{
      teachers: ListTeachersResolver
    }
  },

  {
    path: 'lookups',
    component: ListTeachersComponent,
    resolve:{
      teachers: ListTeachersResolver
    }
  },

  {
    path: 'mail',
    loadChildren: () => import('../mail/mail.module').then(m => m.MailModule),
    canActivate: [TeacherAuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
