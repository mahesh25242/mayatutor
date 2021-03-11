import { Component, Input, OnInit } from '@angular/core';
import { CourseModule, User } from 'src/app/lib/interfaces';
import {faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import {  faLock } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/lib/services';


@Component({
  selector: 'app-course-module',
  templateUrl: './course-module.component.html',
  styleUrls: ['./course-module.component.scss']
})
export class CourseModuleComponent implements OnInit {
  @Input() course_module:CourseModule;
  user$: Observable<User>;
  faWhatsapp = faWhatsapp;
  faLock = faLock;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user$ = this.userService.getloggedUser
  }

}
