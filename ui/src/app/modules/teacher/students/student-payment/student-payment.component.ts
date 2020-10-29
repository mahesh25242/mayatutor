import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CourseWithPagination, User } from 'src/app/lib/interfaces';
import { TeacherService } from 'src/app/lib/services';

@Component({
  selector: 'app-student-payment',
  templateUrl: './student-payment.component.html',
  styleUrls: ['./student-payment.component.scss']
})
export class StudentPaymentComponent implements OnInit {
  @Input() user: User;
  paymentFrm: FormGroup;
  courses$: Observable<CourseWithPagination>;
  constructor(public modal: NgbActiveModal,
    private teacherService: TeacherService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.courses$ = this.teacherService.listCourses();

    this.paymentFrm = this.formBuilder.group({
      course: [null, []]
    });
  }

}
