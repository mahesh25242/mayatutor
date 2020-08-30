import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/lib/services';
import { Observable } from 'rxjs';
import { User } from 'src/app/lib/interfaces';
import {faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {


  constructor(private userSerivce: UserService) { }

  ngOnInit(): void {

  }

}
