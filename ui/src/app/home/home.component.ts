import { Component, OnDestroy, OnInit } from '@angular/core';
import {faUserGraduate,faUser,faClock,faStar,faStarHalfAlt,faSearch } from '@fortawesome/free-solid-svg-icons';
import { UserService, TeacherService } from '../lib/services';
import { Observable } from 'rxjs';
import { User, Rating } from '../lib/interfaces';
import { BreadCrumbsService } from '../shared-module/components/bread-crumbs/bread-crumbs.component';

declare var _smartsupp:any;
declare var smartsupp:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  faUserGraduate = faUserGraduate;
  faUser = faUser;
  faClock = faClock;
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;
  faSearch = faSearch;

  topRatedTeachers$: Observable<Rating[]>;

  loggedUser$: Observable<User>;
  constructor(private userService: UserService,
    private teacherService: TeacherService,
    private breadCrumbsService: BreadCrumbsService) { }

  ngOnInit(): void {
    this.breadCrumbsService.bcs$.next([
      {
        name: 'Home',
      }
    ]);
    this.loggedUser$ = this.userService.getloggedUser;

    this.topRatedTeachers$ = this.teacherService.topRatedTeacher();

    smartsupp('chat:show');

  }

  ngOnDestroy(){
    smartsupp('chat:hide');

  }
}
