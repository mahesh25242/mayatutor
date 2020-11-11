import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseModule } from 'src/app/lib/interfaces';
import { StudentCourseService } from 'src/app/lib/services';
import { BreadCrumbsService } from 'src/app/shared-module/components/bread-crumbs/bread-crumbs.component';

@Component({
  selector: 'app-launch-module',
  templateUrl: './launch-module.component.html',
  styleUrls: ['./launch-module.component.scss']
})
export class LaunchModuleComponent implements OnInit, OnDestroy {
  module: CourseModule;
  launchSubScr: Subscription;
  constructor(private route: ActivatedRoute,
    private breadCrumbsService: BreadCrumbsService,
    private studentCourseService: StudentCourseService) { }

  ngOnInit(): void {
    this.module = this.route.snapshot.data["module"];
    this.launchSubScr = this.studentCourseService.launchModule({id: this.module.id}).subscribe();

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
  }

  ngOnDestroy(){
    if(this.launchSubScr){
      this.launchSubScr.unsubscribe();
    }
  }
}
