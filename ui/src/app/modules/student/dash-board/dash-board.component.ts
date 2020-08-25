import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/lib/services';
import { Observable } from 'rxjs';
import { User } from 'src/app/lib/interfaces';
import {faStar,faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;
  user$: Observable<User>;
  constructor(private userSerivce: UserService) { }

  ngOnInit(): void {
    this.user$ = this.userSerivce.getloggedUser;
  }

}
