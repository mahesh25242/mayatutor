import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AuthGuard } from '../../lib/guard';


const routes: Routes = [
  {
    path: 'register',
    loadChildren: () => import('../commonPages/common-pages.module').then(m => m.CommonPagesModule),
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
