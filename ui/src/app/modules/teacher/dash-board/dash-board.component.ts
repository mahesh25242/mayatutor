import { Component, OnInit } from '@angular/core';
import { UserService, CourseService, TeacherService } from 'src/app/lib/services';
import { Observable, of } from 'rxjs';
import { User, Course } from 'src/app/lib/interfaces';
import { faEdit, faLock } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import Notiflix from "notiflix";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactTeacherComponent } from './contact-teacher/contact-teacher.component';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  faEdit = faEdit;
  faLock = faLock;
  user$: Observable<User>;
  courses$: Observable<Course[]>;
  isDashBoard: boolean = false;
  constructor(private userService: UserService,
    private teacherService: TeacherService,
    private route: ActivatedRoute,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.user$ = this.userService.getloggedUser.pipe(mergeMap(lUser=>{
      return this.route.params.pipe(mergeMap(res=>{
        if(res && res.teacher){
          if(lUser && (this.route.snapshot.data["user"]?.phone == '*' || this.route.snapshot.data["user"]?.email == '*')){
            return this.userService.getUser(res.teacher)
          }else{
            return this.userService.user;
          }
        }else{
          this.isDashBoard = true;
          return this.userService.getloggedUser
        }
      }));
    }))



    this.courses$ = this.route.params.pipe(mergeMap(res=>{
      if(res && res.teacher){
        return this.teacherService.listCourses({url: res.teacher},'teacherCourses')
      }else{
        return this.teacherService.listCourses()
      }

    }));
  }

  contactTeacher(user: User){
    if(user.email != '*'){
      const modalRef = this.modalService.open(ContactTeacherComponent, {
        size: 'lg'
      });
      modalRef.componentInstance.user = user;
    }else{
      Notiflix.Notify.Failure(`Only logged user can contact to teacher `);
    }
  }

}
