import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewComponent } from './add-new/add-new.component';
import { Observable } from 'rxjs';
import { Course } from 'src/app/lib/interfaces';
import { TeacherService } from 'src/app/lib/services';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  constructor(private _modalService: NgbModal,
    private teacherService: TeacherService) { }

  addNew(){
    const activeModal = this._modalService.open(AddNewComponent,{
      size:'lg'
    });
    //activeModal.componentInstance.isEdit = false;
  }

  ngOnInit(): void {
    this.courses$ = this.teacherService.listCourses();
  }

}
