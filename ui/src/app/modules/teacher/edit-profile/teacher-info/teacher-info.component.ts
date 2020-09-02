import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ControlContainer, FormGroupName } from '@angular/forms';
import { EducationService, SubjectService } from 'src/app/lib/services';
import { Subject as TeachSubject, Education } from 'src/app/lib/interfaces';
import { Observable } from 'rxjs';

@Component({
  //selector: 'app-payment-method',
  selector: '[formGroup] app-teacher-info,[formGroupName] app-teacher-info',
  templateUrl: './teacher-info.component.html',
  styleUrls: ['./teacher-info.component.scss']
})
export class TeacherInfoComponent implements OnInit {

  subjects$: Observable<TeachSubject[] >;
  educations$: Observable<Education[] >;
  teacherInfoFormGroup: FormGroup;


  constructor(private controlContainer: ControlContainer,
    private educationService: EducationService,
    private subjectService:SubjectService) {

  }

  get f() { return this.teacherInfoFormGroup.controls; }

  ngOnInit(): void {
    this.subjects$ = this.subjectService.subjects();
    this.educations$ = this.educationService.educations();
     this.teacherInfoFormGroup = this.controlContainer.control as FormGroup;
  }

  addTagFn(name) {
    return { name: name, tag: true };
}


}
