import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from '../lib/pipes/safe-html.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { NgxCaptchaModule } from 'ngx-captcha';
import Notiflix from "notiflix";
import { PlayerModuleModule } from './player-module.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { ModalComponent } from './components/modal/modal.component';
import { TeacherBlockComponent } from './components/teacher-block/teacher-block.component';
import { CourseBlockComponent } from './components/course-block/course-block.component';
import { AssignedCourseBlockComponent } from './components/assigned-course-block/assigned-course-block.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { SearchComponent } from './components/search/search.component';
import { RatingComponent } from './components/rating/rating.component';
import { BreadCrumbsComponent } from './components/bread-crumbs/bread-crumbs.component';
import { ModuleLaunchComponent } from './components/module-launch/module-launch.component';
import { BackButtonDirective } from './directives/back-button.directive';

Notiflix.Confirm.Init({ borderRadius:"5px",titleColor:"#204486",okButtonBackground:"#204486",cancelButtonBackground:"#e2e2e2",cancelButtonColor:"#393939", });
Notiflix.Notify.Init({ width:"390px", success: {background:"#d4edda",textColor:"#155724",}, failure: {background:"#f8d7da",textColor:"#721c24",}, warning: {background:"#fff3cd",textColor:"#856404",}, info: {background:"#cce5ff",textColor:"#004085",}, });
Notiflix.Report.Init({ svgSize:"80px",borderRadius:"5px",width:"390px", success: {svgColor:"#45c489",buttonBackground:"#204486",}, });
Notiflix.Loading.Init({ svgColor:"#204486", });
Notiflix.Block.Init({ svgColor:"#204486", });

@NgModule({
  declarations: [
    SafeHtmlPipe,
    ModalComponent,
    LoginComponent,
    RegisterComponent,
    TeacherBlockComponent,
    CourseBlockComponent,
    AssignedCourseBlockComponent,
    SearchComponent,
    RatingComponent,
    CourseDetailComponent,
    BreadCrumbsComponent,
    ModuleLaunchComponent,
    BackButtonDirective
  ],
  imports: [
    CommonModule,
    PlayerModuleModule, //no export it
    NgbModule,
    NgSelectModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    DragDropModule,
    PdfViewerModule
  ],
  exports:[
    NgSelectModule,
    NgbModule,
    SafeHtmlPipe,
    ModalComponent,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    LoginComponent,
    RegisterComponent,
    TeacherBlockComponent,
    CourseBlockComponent,
    AssignedCourseBlockComponent,
    SearchComponent,
    DragDropModule,
    RatingComponent,
    CourseDetailComponent,
    BreadCrumbsComponent,
    ModuleLaunchComponent,
    PdfViewerModule,
    BackButtonDirective
  ]
})
export class SharedModuleModule { }
