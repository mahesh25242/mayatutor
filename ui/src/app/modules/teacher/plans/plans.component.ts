import { Component, OnInit } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { TeacherService } from 'src/app/lib/services';
import { BreadCrumbsService } from 'src/app/shared-module/components/bread-crumbs/bread-crumbs.component';
import { Plan } from '../../../lib/interfaces';
@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  faCheck = faCheck;
  plans$ : Observable<Plan[]>;

  video = {
    source : [
      {
        src: `https://www.youtube.com/watch?v=IyR_uYsRdPs&modestbranding=1&showinfo=0&rel=0`,
        provider: 'youtube',
      },
    ]
  };
  constructor(private teacherService : TeacherService,
    private breadCrumbsService: BreadCrumbsService) { }

  ngOnInit(): void {
    this.breadCrumbsService.bcs$.next([
      {
        url: '/',
        name: 'Home',
      },
      {
        name: `Plans`,
      }
    ]);

    this.plans$ = this.teacherService.plans();
  }

}
