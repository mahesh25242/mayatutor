import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { StudentCourse, User } from 'src/app/lib/interfaces';
import { UserService, TeacherService, StudentService, StudentCourseService } from 'src/app/lib/services';
import Notiflix from "notiflix";
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit,OnDestroy {
  @Input() user: User;
  user$: Observable<User>;
  @Output() public loadUser = new EventEmitter();
  studentCourses$: Observable<StudentCourse[]>;

  deletUserSubScr: Subscription;
  toggleStstuSubScr: Subscription;
  studentCoursesSubScr: Subscription;
  constructor(private userService: UserService,
    public modal: NgbActiveModal,
    private teacherService: TeacherService,
    private studentService: StudentService,
    private studentCourseService: StudentCourseService    ) { }


    deleteUser(): void{
      Notiflix.Block.Merge({svgSize:'20px',});
      Notiflix.Block.Dots(`.delete-user`);

      Notiflix.Confirm.Show('Delete?', "Are you sure you want to delete?", 'Yes', 'No', () => {
        this.deletUserSubScr = this.studentService.deleteStudent(this.user.student).subscribe(res=>{
        Notiflix.Block.Remove(`.delete-user`);
        Notiflix.Notify.Success('successfully deleted');
        this.loadUser.emit();
      }, err=>{
        Notiflix.Block.Remove(`.delete-user`);
      });

      }, () => {
        Notiflix.Block.Remove(`.delete-user`);
      } )


    }

    toggleCourseStatus(studentCourse: StudentCourse){
      Notiflix.Confirm.Show('Change Status?', "Are you sure you want to change status?", 'Yes', 'No', () => {
        Notiflix.Loading.Arrows();
        this.toggleStstuSubScr = this.studentCourseService.toggleStatus(studentCourse).pipe(mergeMap(res=>{
          return this.studentCourseService.studentCourses(this.user);
        })).subscribe((res: any)=>{
        Notiflix.Loading.Remove();
        Notiflix.Notify.Success(res.message);
      }, err=>{
        Notiflix.Loading.Remove();
      });

      }, () => {

      } )
    }

    deleteStudentCourse(studentCourse: StudentCourse){
      Notiflix.Confirm.Show('Delete', "Are you sure you want to delete?", 'Yes', 'No', () => {
        Notiflix.Loading.Arrows();
        this.toggleStstuSubScr = this.studentCourseService.deleteCourse(studentCourse).pipe(mergeMap(res=>{
          return this.studentCourseService.studentCourses(this.user);
        })).subscribe((res: any)=>{
        Notiflix.Loading.Remove();
        Notiflix.Notify.Success(res.message);
      }, err=>{
        Notiflix.Loading.Remove();
      });

      }, () => {

      } )
    }

  ngOnInit(): void {
    this.studentCoursesSubScr = this.studentCourseService.studentCourses(this.user).subscribe();
    this.studentCourses$ = this.studentCourseService.studentCourse;
  }

  ngOnDestroy(){
    if(this.deletUserSubScr){
      this.deletUserSubScr.unsubscribe();
    }
    if(this.toggleStstuSubScr){
      this.toggleStstuSubScr.unsubscribe();
    }
    if(this.studentCoursesSubScr){
      this.studentCoursesSubScr.unsubscribe();
    }
  }

}
