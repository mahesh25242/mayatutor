import { Component, OnInit } from '@angular/core';
import { StudentCourseService, UserService } from 'src/app/lib/services';
import { Observable } from 'rxjs';
import { StudentCourse, User } from 'src/app/lib/interfaces';
import {faEdit } from '@fortawesome/free-solid-svg-icons';
import { tap } from 'rxjs/operators';
import { BreadCrumbsService } from 'src/app/shared-module/components/bread-crumbs/bread-crumbs.component';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  faEdit = faEdit;
  user$: Observable<User>;
  currentRate = 2.3;
  studentCourses$: Observable<StudentCourse[]>;
  constructor(private userSerivce: UserService,
    private breadCrumbsService: BreadCrumbsService,
    private studentCourseService: StudentCourseService) { }

  ngOnInit(): void {
    this.user$ = this.userSerivce.getloggedUser.pipe(tap(res=>{
      this.breadCrumbsService.bcs$.next([
        {
          url: '/',
          name: 'Home',
        },
        {
          name: `${res?.fname} Dashboard`,
        }
      ]);
    }));

    this.studentCourses$ = this.studentCourseService.allMyCourses();

  }

}
