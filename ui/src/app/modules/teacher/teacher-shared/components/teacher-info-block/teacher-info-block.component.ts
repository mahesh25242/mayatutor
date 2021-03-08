import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/lib/interfaces';


@Component({
  selector: 'app-teacher-info-block',
  templateUrl: './teacher-info-block.component.html',
  styleUrls: ['./teacher-info-block.component.scss']
})
export class TeacherInfoBlockComponent implements OnInit {
  @Input() teacher: User;

  constructor() { }

  ngOnInit(): void {


  }

}
