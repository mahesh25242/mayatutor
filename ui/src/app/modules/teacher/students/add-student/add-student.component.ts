import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { CourseWithPagination, User, UserWithPagination } from 'src/app/lib/interfaces';
import { TeacherService, UserService } from 'src/app/lib/services';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  addStudenttFrm: FormGroup;
  studentInput$ = new Subject<string>();
  students$: Observable<UserWithPagination>;
  peopleLoading = false;

  courses$: Observable<CourseWithPagination>;
  constructor(private formBuilder: FormBuilder,
    private teacherService: TeacherService,
    private userService: UserService) { }

  addStudent(){

  }

  resetSearch(){

  }

  trackByFn(item: User) {
      return item.id;
  }

  get f(){ return this.addStudenttFrm.controls; }

  ngOnInit(): void {
    this.addStudenttFrm = this.formBuilder.group({
      phone: [null, []],
      course: [null, []],
    });

    this.courses$ = this.teacherService.listCourses();
    this.loadStudent();

  }

  private loadStudent() {
    this.students$ = concat(
        of([]), // default items
        this.studentInput$.pipe(
            distinctUntilChanged(),
            tap(() => this.peopleLoading = true),
            switchMap(term => this.userService.fetchAllStudent(1, `q=${term}`).pipe(
                map(res=>{
                  return res.data;
                }),
                catchError(() => of(null)), // empty list on error
                tap(() => this.peopleLoading = false)
            ))
        )
    );
}

}
