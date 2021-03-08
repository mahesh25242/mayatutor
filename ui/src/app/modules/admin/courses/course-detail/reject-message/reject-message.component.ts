import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Course } from 'src/app/lib/interfaces';
import Notiflix from "notiflix";
import { Subscription } from 'rxjs';
import { CourseService } from 'src/app/lib/services';

@Component({
  selector: 'app-reject-message',
  templateUrl: './reject-message.component.html',
  styleUrls: ['./reject-message.component.scss']
})
export class RejectMessageComponent implements OnInit, OnDestroy {
  @Input() course: Course;
  @Output() reloadCourse = new EventEmitter();
  message:string = null;
  rejectCourseSubScr: Subscription;
  constructor(public modal: NgbActiveModal,
    private courseService: CourseService) { }

  rejectRequest(){
      Notiflix.Loading.Dots();
      const postData = { ...this.course.latest_course_approval_request, message: this.message, status : 2}
      this.rejectCourseSubScr = this.courseService.approveOrRejectCourse(postData).subscribe(res=>{
      this.reloadCourse.emit();
      Notiflix.Loading.Remove();
      Notiflix.Notify.Success(`${this.course.name} rejected successfully`);
    }, err=>{
      Notiflix.Loading.Remove();
    });
  }
  ngOnInit(): void {
  }

  ngOnDestroy(){
    if(this.rejectCourseSubScr){
      this.rejectCourseSubScr.unsubscribe();
    }
  }
}
