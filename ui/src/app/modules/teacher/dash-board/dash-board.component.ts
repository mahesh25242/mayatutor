import { Component, OnInit } from '@angular/core';
import { UserService, CourseService, TeacherService } from 'src/app/lib/services';
import { Observable } from 'rxjs';
import { User, Course } from 'src/app/lib/interfaces';
import {faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  faEdit = faEdit;
  user$: Observable<User>;
  courses$: Observable<Course[]>;

  constructor(private userSerivce: UserService,
    private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.user$ = this.userSerivce.getloggedUser;

    this.courses$ = this.teacherService.listCourses();
  }

}
