import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/lib/interfaces';
import { BreadCrumbsService } from 'src/app/shared-module/components/bread-crumbs/bread-crumbs.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  course: Course;
  video: any = null;
  constructor(private route: ActivatedRoute,
    private breadCrumbsService: BreadCrumbsService,) { }

  ngOnInit(): void {
    this.course = this.route.snapshot.data["course"];


    if(this.course){
      this.video =  {
        source : [
          {
            src: `${this.course.live_class_url}&modestbranding=1&showinfo=0&rel=0`,
            provider: 'youtube',
          },
        ]
      };

      this.breadCrumbsService.bcs$.next([
        {
          url: '/',
          name: 'Home',
        },
        {
          name: `${this.course.name}`,
        },
      ]);

    }
  }

}
