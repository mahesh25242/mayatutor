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
import { SettingsComponent } from './settings/settings.component';
import { SettingsResolver } from './settings/settings-resolver';
import { HomePageBannerComponent } from './settings/home-page-banner/home-page-banner.component';
import { HomePageVideosComponent } from './settings/home-page-videos/home-page-videos.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { PurchasesResolver } from './purchases/purchases-resolver';


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
        },
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
      {
        path: 'coupons',
        loadChildren: () => import('../coupon/coupon.module').then(m => m.CouponModule),
        data:{
          url: 'admin'
        },
      },
      {
        path: 'mail',
        loadChildren: () => import('../mail/mail.module').then(m => m.MailModule),
        canActivate: [AdminAuthGuard],
      },
      {
        path: 'settings',
        component: SettingsComponent,
        resolve:{
          settings: SettingsResolver
        }
      },
      {
        path: 'home-page-banner',
        component: HomePageBannerComponent,
      },
      {
        path: 'home-page-videos',
        component: HomePageVideosComponent,
      },
      {
        path: 'purchases',
        component: PurchasesComponent,
        resolve:{
          purchases: PurchasesResolver
        }
      },
    ]
  },






];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
