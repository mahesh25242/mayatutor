import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CourseWithPagination, User, UserPayment } from 'src/app/lib/interfaces';
import { StudentPaymentService, TeacherService } from 'src/app/lib/services';
import Notiflix from "notiflix";

@Component({
  selector: 'app-student-payment',
  templateUrl: './student-payment.component.html',
  styleUrls: ['./student-payment.component.scss']
})
export class StudentPaymentComponent implements OnInit {
  @Input() user: User;
  paymentFrm: FormGroup;
  studentPayments$: Observable<UserPayment[]>;
  courses$: Observable<CourseWithPagination>;
  studentPaymentsSubscription: Subscription;
  constructor(public modal: NgbActiveModal,
    private teacherService: TeacherService,
    private formBuilder: FormBuilder,
    private studentPaymentService: StudentPaymentService) { }

  get f(){
    return this.paymentFrm.controls;
  }

  changeCourse(evt){
    Notiflix.Loading.Arrows();
    this.studentPayments$ = this.studentPaymentService.payments({course_id: evt.id}).pipe(tap(res=>Notiflix.Loading.Remove()));
  }
  ngOnInit(): void {

    this.courses$ = this.teacherService.listCourses();

    this.paymentFrm = this.formBuilder.group({
      course: [null, []]
    });


  }

}
