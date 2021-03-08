import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { UserWithPagination } from 'src/app/lib/interfaces';
import { TeacherService } from 'src/app/lib/services';


@Component({
  selector: 'app-list-teachers',
  templateUrl: './list-teachers.component.html',
  styleUrls: ['./list-teachers.component.scss']
})
export class ListTeachersComponent implements OnInit {
  teachers$: Observable<UserWithPagination>;
  q: string = '';
  constructor(private route: ActivatedRoute,
    private teacherService: TeacherService) { }

  loadMore(nextPage:number = 1){
    this.teacherService.searchTeachers(this.q, nextPage).subscribe()

  }
  ngOnInit(): void {
    this.teachers$ = this.route.params.pipe(mergeMap(parm=>{
      this.q = (parm?.q) ? parm?.q : '';
      return this.teacherService.teachers;
    }));
  }

}
