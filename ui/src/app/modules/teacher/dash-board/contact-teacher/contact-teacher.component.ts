import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/lib/interfaces';


@Component({
  selector: 'app-contact-teacher',
  templateUrl: './contact-teacher.component.html',
  styleUrls: ['./contact-teacher.component.scss']
})
export class ContactTeacherComponent implements OnInit {
  @Input() user:User;
  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {

  }

}
