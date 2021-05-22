import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/lib/services';
import {faEdit, faUsers, faGraduationCap, faFile, faComment } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  faEdit = faEdit;
  faUsers = faUsers;
  faGraduationCap = faGraduationCap;
  faFile = faFile;
  faComment = faComment;


  constructor(private userSerivce: UserService) { }

  ngOnInit(): void {

  }

}
