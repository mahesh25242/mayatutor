import { Component, OnInit, Input } from '@angular/core';
import {faUser,faClock } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/lib/interfaces';


@Component({
  selector: 'app-teacher-block',
  templateUrl: './teacher-block.component.html',
  styleUrls: ['./teacher-block.component.scss']
})
export class TeacherBlockComponent implements OnInit {
  @Input() teacher: User;
  faUser = faUser;
  faClock = faClock;
    currentRate ;

  constructor() { }

  ngOnInit(): void {
    this.currentRate = this.teacher.rating.rate / this.teacher.rating.tot_users;
  }

}
