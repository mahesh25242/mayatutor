import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { CourseModule } from 'src/app/lib/interfaces';
import { StudentCourseService } from 'src/app/lib/services';
import { BreadCrumbsService } from 'src/app/shared-module/components/bread-crumbs/bread-crumbs.component';
import Notiflix from "notiflix";
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-launch-module',
  templateUrl: './launch-module.component.html',
  styleUrls: ['./launch-module.component.scss']
})
export class LaunchModuleComponent implements OnInit, OnDestroy {
  module: CourseModule;

  finishedSubScr: Subscription;
  launch: any;
  constructor(private route: ActivatedRoute,
    private breadCrumbsService: BreadCrumbsService,
    private studentCourseService: StudentCourseService,
    private router: Router,) {
      // this.router.routeReuseStrategy.shouldReuseRoute = function () {
      //   return false;
      // };

     }

    markAsFinished(){

      Notiflix.Confirm.Show('Change Status?', "Are you sure you want to change status?", 'Yes', 'No', () => {
        Notiflix.Loading.Dots();
        this.finishedSubScr = this.studentCourseService.markAsFinished({id: this.module.logged_student_course.id, module_id: this.module.id}).pipe(mergeMap((res:any)=>{
          Notiflix.Notify.Success(res.message);
          return this.studentCourseService.fetchNextModule({module_id: this.module.id});
        })).subscribe((res: any)=>{
          Notiflix.Loading.Remove();
          //if(!res){
            this.router.navigate(['../../'], {relativeTo: this.route});
         // }else{
          //  this.router.navigate([`../${res.id}`], {relativeTo: this.route});
         // }
      }, err=>{
        Notiflix.Loading.Remove();
      });

      }, () => {
      } );
    }

  ngOnInit(): void {
    this.module = this.route.snapshot.data["module"];

    this.breadCrumbsService.bcs$.next([
      {
        url: '/',
        name: 'Home',
      },
      {
        url:`/student/course/${this.module.course_id}`,
        name: `${this.module.course.name}`,
      },
      {
        name: this.module.name
      }
    ]);

    this.launch =  this.studentCourseService.launchModule({id: this.module?.logged_student_course?.id, module_id: this.module.id});

  }

  ngOnDestroy(){


    if(this.finishedSubScr){
      this.finishedSubScr.unsubscribe();
    }

  }
}
