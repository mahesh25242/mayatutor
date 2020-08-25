import { Component, OnInit } from '@angular/core';
import {faUser,faClock,faStar,faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-teacher-block',
  templateUrl: './teacher-block.component.html',
  styleUrls: ['./teacher-block.component.scss']
})
export class TeacherBlockComponent implements OnInit {
  faUser = faUser;
  faClock = faClock;
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;
  constructor() { }

  ngOnInit(): void {
  }

}
