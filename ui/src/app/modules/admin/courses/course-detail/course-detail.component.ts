import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/lib/interfaces';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  course: Course;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.course = this.route.snapshot.data["course"];
  }

}
