import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewComponent } from './add-new/add-new.component';
import { Observable, Subscription } from 'rxjs';
import { Course } from 'src/app/lib/interfaces';
import {  CourseService } from 'src/app/lib/services';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Notiflix from "notiflix";
import { mergeMap, map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {
  faEdit = faEdit;
  faTrash = faTrash;
  courses$: Observable<Course[]>;
  deleteCouseSuScr: Subscription;

  searchFrm: FormGroup;

  constructor(private _modalService: NgbModal,
    private courseService: CourseService,
    private formBuilder: FormBuilder) { }

  addNew(course: Course = null ){
    const activeModal = this._modalService.open(AddNewComponent,{
      size:'lg'
    });
    activeModal.componentInstance.course = course;
    activeModal.componentInstance.searchFrm = this.searchFrm;
  }

  deleteCourse(course:Course){
    Notiflix.Block.Merge({svgSize:'20px',});
    Notiflix.Block.Dots(`.del-${course.id}`);
    Notiflix.Confirm.Show('Delete', `Do you want to delete ${course.name} ?`, 'Yes', 'No', () => {
      this.deleteCouseSuScr = this.courseService.deleteCourse(course).pipe(mergeMap(res=>{
        const postData ={
          q: this.searchFrm.controls.q.value
        }

          return this.courseService.listCourses(postData);
        })).subscribe(res=>{
          Notiflix.Block.Remove(`.del-${course.id}`);
          Notiflix.Notify.Success(`Successfully deleted ${course.name}`);
        }, error =>{
          Notiflix.Block.Remove(`.del-${course.id}`);
        });
    }, () => {
      Notiflix.Block.Remove(`.del-${course.id}`);
    } );
  }


  searchCourse(){
    Notiflix.Block.Dots(`app-courses table`);
    const postData = {
      q: this.searchFrm.controls.q.value
    }

    this.courseService.listCourses(postData).subscribe(res=>{
      Notiflix.Block.Remove(`app-courses table`);
    }, error=>{
      Notiflix.Block.Remove(`app-courses table`);
    })

  }

  ngOnInit(): void {
    this.courses$ = this.courseService.courses;

    this.searchFrm = this.formBuilder.group({
      q: [null, [ Validators.required]],
    });
  }

  ngOnDestroy(){
    if(this.deleteCouseSuScr){
      this.deleteCouseSuScr.unsubscribe();
    }
  }

}
