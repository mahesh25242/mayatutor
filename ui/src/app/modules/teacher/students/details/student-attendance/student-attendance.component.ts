import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, Subscription, throwError } from 'rxjs';
import { StudentCourse, User, UserLogin, UserLoginWithPagination } from 'src/app/lib/interfaces';
import { UserService, TeacherService, StudentService, StudentCourseService } from 'src/app/lib/services';
import Notiflix from "notiflix";
import { catchError, mergeMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.scss']
})
export class StudentAttendanceComponent implements OnInit,OnDestroy {
  @Input() user: User;
  logs$: Observable<UserLoginWithPagination>
  private currPage$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  constructor(private userService: UserService,
        ) { }



  paginate(evt: number = 0){
    this.currPage$.next(evt)
  }
  ngOnInit(): void {
    this.logs$ = this.currPage$.asObservable().pipe(mergeMap(res=>{
      Notiflix.Block.Dots(`.attendance-tbl`);
      return this.userService.getLoginLogs(this.user?.id, res);
    }), tap(res=>{
      Notiflix.Block.Remove(`.attendance-tbl`);
    }), catchError(err=>{
      Notiflix.Block.Remove(`.attendance-tbl`);
      return throwError(err);
    }))
  }

  ngOnDestroy(){

  }

}
