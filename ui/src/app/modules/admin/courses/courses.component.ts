import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/lib/interfaces';
import { CourseService } from 'src/app/lib/services';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>
  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courses$= this.courseService.listCourses();
  }

}
