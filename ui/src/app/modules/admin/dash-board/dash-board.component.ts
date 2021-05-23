import { Component, OnInit } from '@angular/core';
import { UserService, GeneralService } from 'src/app/lib/services';
import {faEdit, faUsers, faGraduationCap, faFile, faComment } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

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

  stats$: Observable<any>;
  constructor(private userSerivce: UserService,
    private generalService: GeneralService) { }

  ngOnInit(): void {
    this.stats$ = this.generalService.stat();
  }

}
