import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { TeacherService, UserService } from 'src/app/lib/services';
import { BreadCrumbsService } from 'src/app/shared-module/components/bread-crumbs/bread-crumbs.component';
import { Plan, User } from '../../../lib/interfaces';
@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  faCheck = faCheck;
  plans : Plan[];
  loggedUser$: Observable<User>;


  constructor(private teacherService : TeacherService,
    private breadCrumbsService: BreadCrumbsService,
    private userService: UserService,
    private route: ActivatedRoute
) { }

  ngOnInit(): void {
    this.loggedUser$ = this.userService.getloggedUser;
    this.breadCrumbsService.bcs$.next([
      {
        url: '/',
        name: 'Home',
      },
      {
        name: `Plans`,
      }
    ]);

    this.plans = this.route.snapshot.data?.plans;

  }

}
