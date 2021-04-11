import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/lib/interfaces';
import { UserService } from 'src/app/lib/services';
import {faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import {  faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-teacher-info-block',
  templateUrl: './teacher-info-block.component.html',
  styleUrls: ['./teacher-info-block.component.scss']
})
export class TeacherInfoBlockComponent implements OnInit {
  @Input() teacher: User;
  user$: Observable<User>;
  faWhatsapp = faWhatsapp;
  faLock = faLock;
  currentRate: number =0;

  constructor(private userService: UserService) { }


  ngOnInit(): void {

    this.user$ = this.userService.getloggedUser
  }

}
