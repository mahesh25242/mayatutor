import { Component, OnInit } from '@angular/core';
import { UserService, CourseService, TeacherService } from 'src/app/lib/services';
import { Observable, of } from 'rxjs';
import { User, Course } from 'src/app/lib/interfaces';
import {faEdit } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  faEdit = faEdit;
  user$: Observable<User>;
  courses$: Observable<Course[]>;
  isDashBoard: boolean = false;
  constructor(private userSerivce: UserService,
    private teacherService: TeacherService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user$ = this.route.params.pipe(mergeMap(res=>{
      if(res && res.teacher){
        return of(this.route.snapshot.data["user"]);
      }else{
        this.isDashBoard = true;
        return this.userSerivce.getloggedUser
      }
    }));

    this.courses$ = this.route.params.pipe(mergeMap(res=>{
      if(res && res.teacher){
        return this.teacherService.listCourses({url: res.teacher})
      }else{
        return this.teacherService.listCourses()
      }

    }));
  }

}
