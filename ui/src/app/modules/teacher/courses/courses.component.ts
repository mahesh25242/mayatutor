import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewComponent } from './add-new/add-new.component';
import { Observable, Subscription } from 'rxjs';
import { Course, CourseWithPagination } from 'src/app/lib/interfaces';
import {  CourseService, TeacherService } from 'src/app/lib/services';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Notiflix from "notiflix";
import { mergeMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BreadCrumbsService } from 'src/app/shared-module/components/bread-crumbs/bread-crumbs.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {
  faEdit = faEdit;
  faTrash = faTrash;
  courses$: Observable<CourseWithPagination>;
  deleteCouseSuScr: Subscription;

  searchFrm: FormGroup;

  constructor(private _modalService: NgbModal,
    private courseService: CourseService,
    private teacherService: TeacherService,
    private formBuilder: FormBuilder,
    private breadCrumbsService: BreadCrumbsService) { }

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

          return this.teacherService.listCourses(1, postData);
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

    this.teacherService.listCourses(1, postData).subscribe(res=>{
      Notiflix.Block.Remove(`app-courses table`);
    }, error=>{
      Notiflix.Block.Remove(`app-courses table`);
    })

  }

  ngOnInit(): void {

    this.breadCrumbsService.bcs$.next([
      {
        url: '/',
        name: 'Home',
      },
      {
        name: 'Courses',
      }
    ]);

    this.courses$ = this.teacherService.courses;

    this.searchFrm = this.formBuilder.group({
      q: [null, [ Validators.required]],
    });
  }

  search(evt){
    this.teacherService.listCourses(evt).subscribe();
  }
  ngOnDestroy(){
    if(this.deleteCouseSuScr){
      this.deleteCouseSuScr.unsubscribe();
    }
  }

}
