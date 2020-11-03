import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseModule } from 'src/app/lib/interfaces';
import { BreadCrumbsService } from 'src/app/shared-module/components/bread-crumbs/bread-crumbs.component';

@Component({
  selector: 'app-launch-module',
  templateUrl: './launch-module.component.html',
  styleUrls: ['./launch-module.component.scss']
})
export class LaunchModuleComponent implements OnInit {
  module: CourseModule;
  constructor(private route: ActivatedRoute,
    private breadCrumbsService: BreadCrumbsService) { }

  ngOnInit(): void {
    this.module = this.route.snapshot.data["module"];

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
        url:`/admin/courses/${this.module.course_id}/detail`,
        name: `${this.module.course.name}`,
      },
      {
        name: this.module.name
      }
    ]);

  }

}
