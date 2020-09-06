import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/lib/interfaces';
import { Observable } from 'rxjs';
import { TeacherService } from 'src/app/lib/services';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit {
  course$: Observable<Course>;
  constructor(private route:ActivatedRoute,
    private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.course$ = this.route.params.pipe(mergeMap(res=>{
      return this.teacherService.course(res.courseId);
    }))
  }

}
