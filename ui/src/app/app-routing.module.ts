import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashBoardComponent } from './modules/teacher/dash-board/dash-board.component';
import { DashBoardResolver } from './modules/teacher/dash-board/dash-board-resolver';
import { SetNewPasswordComponent } from './set-new-password/set-new-password.component';
import { UserActivationComponent } from './user-activation/user-activation.component';
import { CookiesPolicyComponent } from './cookies-policy/cookies-policy.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { PurchaseLandingComponent } from './purchase-landing/purchase-landing.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'how-it-works',
    component: HowItWorksComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'cookies-policy',
    component: CookiesPolicyComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsComponent
  },
  {
    path: 'set-new-password/:key',
    component: SetNewPasswordComponent
  },
  {
    path: 'user-activation/:key',
    component: UserActivationComponent
  },
  {
    path: 'student',
    loadChildren: () => import('./modules/student/student.module').then(m => m.StudentModule)
  },
  {
    path: 'teacher',
    loadChildren: () => import('./modules/teacher/teacher.module').then(m => m.TeacherModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: ':teacher',
    component: DashBoardComponent,
    resolve:{
      user: DashBoardResolver
    }
  },
  {
    path: ':teacher/course',
    loadChildren: () => import('./modules/student/student-shared/student-shared.module').then(m => m.StudentSharedModule)
  },
  {
    path: 'purchase/success/:id',
    component: PurchaseLandingComponent,
  },
  {
    path: 'purchase/failer',
    component: PurchaseLandingComponent,
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
    scrollPositionRestoration: 'top',
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy',
  //  enableTracing: true
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
