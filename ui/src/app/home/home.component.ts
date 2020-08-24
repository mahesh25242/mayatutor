import { Component, OnInit } from '@angular/core';
import {faUserGraduate,faUser,faClock,faStar,faStarHalfAlt,faSearch } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faUserGraduate = faUserGraduate;
  faUser = faUser;
  faClock = faClock;
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;
  faSearch = faSearch;

  constructor() { }

  ngOnInit(): void {
  }

}
