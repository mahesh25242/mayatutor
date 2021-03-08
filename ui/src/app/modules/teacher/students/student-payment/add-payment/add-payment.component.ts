import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateINParserFormatter } from '../../../../../lib/providers/ngb-date-in-parser-formatter';
import { DatePipe } from '@angular/common';
import { StudentPaymentService } from 'src/app/lib/services';
import { Subscription } from 'rxjs';
import Notiflix from "notiflix";
import { Course, User } from 'src/app/lib/interfaces';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss'],
  providers: [{provide: NgbDateParserFormatter, useClass: NgbDateINParserFormatter}, DatePipe],
})
export class AddPaymentComponent implements OnInit, OnDestroy {
  @Input() user: User;
  @Input() course: Course;
  @Output() changeCourse = new EventEmitter();
  faCalendar = faCalendar;
  addPaymentFrm: FormGroup;
  savePaymentSubScr: Subscription;
  constructor(private formBuilder: FormBuilder,
  private studentPaymentService: StudentPaymentService) { }

  get f(){ return this.addPaymentFrm.controls; }

  savePayment(){
    Notiflix.Loading.Arrows();
    const postData = {
      amount: this.f.amount.value,
      start_date: this.f.start_date.value,
      end_date: this.f.end_date.value,
      method: this.f.method.value,
      user_id: this.user.id,
      course_id: this.course.id
    }
    this.savePaymentSubScr = this.studentPaymentService.createPayment(postData).subscribe(res=>{
      Notiflix.Loading.Remove();
      this.changeCourse.emit();
      Notiflix.Notify.Success("successfully saved");
    }, error=>{
      Notiflix.Loading.Remove();
      if(error.status == 422){
        for(let result in this.addPaymentFrm.controls){
          if(error.error.errors[result]){
            this.addPaymentFrm.controls[result].setErrors({ error: error.error.errors[result] });
          }else{
            this.addPaymentFrm.controls[result].setErrors(null);
          }
        }
      }else{
        Notiflix.Notify.Failure(`Sorry can't be added please try again later `);
      }


    });
  }
  ngOnInit(): void {
    this.addPaymentFrm = this.formBuilder.group({
      amount: [null, []],
      start_date: [null, []],
      end_date: [null, []],
      method: [null, []],
    });
  }

  ngOnDestroy(){
    if(this.savePaymentSubScr){
      this.savePaymentSubScr.unsubscribe();
    }
  }
}
