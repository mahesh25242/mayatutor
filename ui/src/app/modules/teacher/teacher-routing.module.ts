import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'register',
    loadChildren: () => import('../commonPages/common-pages.module').then(m => m.CommonPagesModule),
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
