import { Component, OnInit, Input } from '@angular/core';
import {faUser,faClock } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/lib/interfaces';


@Component({
  selector: 'app-course-block',
  templateUrl: './course-block.component.html',
  styleUrls: ['./course-block.component.scss']
})
export class CourseBlockComponent implements OnInit {
  @Input() teacher: User;
  faUser = faUser;
  faClock = faClock;
    currentRate ;

  constructor() { }

  ngOnInit(): void {
    this.currentRate = this.teacher.rating.rate / this.teacher.rating.tot_users;
  }

}
