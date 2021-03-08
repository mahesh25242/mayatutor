import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/lib/services';

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
