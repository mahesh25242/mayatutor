import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course, CourseModule } from 'src/app/lib/interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModuleLaunchComponent } from 'src/app/shared-module/components/module-launch/module-launch.component';
import { BreadCrumbsService } from 'src/app/shared-module/components/bread-crumbs/bread-crumbs.component';
import Notiflix from "notiflix";
import { Subscription } from 'rxjs';
import { CourseService, TeacherService } from 'src/app/lib/services';
import { mergeMap } from 'rxjs/operators';
import { RejectMessageComponent } from './reject-message/reject-message.component';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit, OnDestroy {
  course: Course;
  changeAutoApprovalSubScr: Subscription;
  approveCourseSubScr: Subscription;
  reloadDaatSubScr: Subscription;
  constructor(private route: ActivatedRoute,
    private _modalService: NgbModal,
    private breadCrumbsService: BreadCrumbsService,
    private teacherService: TeacherService,
    private courseService: CourseService) { }

    toggleAutoApproval(): void{
      Notiflix.Loading.Dots();

      this.changeAutoApprovalSubScr = this.teacherService.toggleAutoApproval(this.course.user).subscribe(res=>{
        Notiflix.Loading.Remove();
        Notiflix.Notify.Success(res.message);
      }, err=>{
        Notiflix.Loading.Remove();
      });
    }

    rejectIt(){
      const rejectPopUp = this._modalService.open(RejectMessageComponent);
      rejectPopUp.componentInstance.course = this.course;

      this.reloadDaatSubScr = rejectPopUp.componentInstance.reloadCourse.pipe(mergeMap(res =>{
        return this.courseService.course(this.course.id)
      })).subscribe(res=>{
        this.course = res;
        rejectPopUp.close();
      });

    }
    approveIt(){
      Notiflix.Confirm.Show('Approve?', "Are you sure you want to aprove?", 'Yes', 'No', () => {
        Notiflix.Loading.Dots();
        const postData = { ...this.course.latest_course_approval_request,  status : 1}
        this.approveCourseSubScr = this.courseService.approveOrRejectCourse(postData).pipe(mergeMap(res=>{
          return this.courseService.course(this.course.id)
        })).subscribe(res=>{
          this.course = res;
        Notiflix.Loading.Remove();
        Notiflix.Notify.Success(`${this.course.name} approved successfully`);
      }, err=>{
        Notiflix.Loading.Remove();
      });

      }, () => {
      } )
    }

  ngOnInit(): void {
    this.course = this.route.snapshot.data["course"];

    this.breadCrumbsService.bcs$.next([
      {
        url: '/',
        name: 'Home',
      },
      {
        url:`/admin/courses`,
        name: 'Courses',
      },
      {
        name: this.course.name
      }
    ]);
  }


  ngOnDestroy(){
    if(this.changeAutoApprovalSubScr){
      this.changeAutoApprovalSubScr.unsubscribe();
    }
    if(this.approveCourseSubScr){
      this.approveCourseSubScr.unsubscribe();
    }
    if(this.reloadDaatSubScr){
      this.reloadDaatSubScr.unsubscribe();
    }
  }


}
