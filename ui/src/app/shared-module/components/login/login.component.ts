import { Component, OnInit, Input } from '@angular/core';
import {faUserGraduate,faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() type:string;
  faUserGraduate = faUserGraduate;
  faUser = faUser;
  constructor() { }


  ngOnInit(): void {
  }

}
