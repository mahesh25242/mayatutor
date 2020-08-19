import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'student',
    loadChildren: () => import('./modules/student/student.module').then(m => m.StudentModule)
  },
  {
    path: 'teacher',
    loadChildren: () => import('./modules/teacher/teacher.module').then(m => m.TeacherModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
