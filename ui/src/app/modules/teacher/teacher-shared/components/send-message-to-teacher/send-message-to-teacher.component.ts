import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/lib/interfaces';
import { ContactTeacherComponent } from '../contact-teacher/contact-teacher.component';

@Component({
  selector: 'app-send-message-to-teacher',
  templateUrl: './send-message-to-teacher.component.html',
  styleUrls: ['./send-message-to-teacher.component.scss']
})
export class SendMessageToTeacherComponent implements OnInit {
  @Input() user: User;
  constructor(private modalService: NgbModal,) { }

  contactTeacher(){
    const modalRef = this.modalService.open(ContactTeacherComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.user = this.user;
  }
  ngOnInit(): void {
  }

}
