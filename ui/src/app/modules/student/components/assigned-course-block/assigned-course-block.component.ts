import { Component, OnInit, Input } from '@angular/core';
import {faUser,faClock } from '@fortawesome/free-solid-svg-icons';
import { User, Course, StudentCourse } from 'src/app/lib/interfaces';


@Component({
  selector: 'app-assigned-course-block',
  templateUrl: './assigned-course-block.component.html',
  styleUrls: ['./assigned-course-block.component.scss']
})
export class AssignedCourseBlockComponent implements OnInit {
  @Input() studentCourse: StudentCourse;


  constructor() { }

  ngOnInit(): void {

  }

}
