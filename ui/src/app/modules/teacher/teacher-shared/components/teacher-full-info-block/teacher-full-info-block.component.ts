import { Component, Input, OnInit } from '@angular/core';
import { Course, User } from 'src/app/lib/interfaces';
import { faEdit, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-teacher-full-info-block',
  templateUrl: './teacher-full-info-block.component.html',
  styleUrls: ['./teacher-full-info-block.component.scss']
})
export class TeacherFullInfoBlockComponent implements OnInit {
  faEdit = faEdit;
  faLock = faLock;
  @Input() user: User;

  constructor() { }

  ngOnInit(): void {


  }

}
