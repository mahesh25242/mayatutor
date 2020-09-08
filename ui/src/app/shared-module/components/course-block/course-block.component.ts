import { Component, OnInit, Input } from '@angular/core';
import {faUser,faClock } from '@fortawesome/free-solid-svg-icons';
import { User, Course } from 'src/app/lib/interfaces';


@Component({
  selector: 'app-course-block',
  templateUrl: './course-block.component.html',
  styleUrls: ['./course-block.component.scss']
})
export class CourseBlockComponent implements OnInit {
  @Input() course: Course;


  constructor() { }

  ngOnInit(): void {

  }

}
