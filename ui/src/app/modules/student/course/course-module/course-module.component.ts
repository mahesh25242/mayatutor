import { Component, Input, OnInit } from '@angular/core';
import { CourseModule } from 'src/app/lib/interfaces';

@Component({
  selector: 'app-course-module',
  templateUrl: './course-module.component.html',
  styleUrls: ['./course-module.component.scss']
})
export class CourseModuleComponent implements OnInit {
  @Input() course_module:CourseModule;
  constructor() { }

  ngOnInit(): void {
  }

}
