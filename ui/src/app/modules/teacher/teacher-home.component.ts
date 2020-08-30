import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/lib/services';
import { Observable } from 'rxjs';
import { User } from 'src/app/lib/interfaces';
import {faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.scss']
})
export class TeacherHomeComponent implements OnInit {


  constructor(private userSerivce: UserService) { }

  ngOnInit(): void {

  }

}
