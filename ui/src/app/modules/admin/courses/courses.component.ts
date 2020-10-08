import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Course, CourseWithPagination } from 'src/app/lib/interfaces';
import { CourseService } from 'src/app/lib/services';
import Notiflix from "notiflix";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses$: Observable<CourseWithPagination>;
  searchFrm: FormGroup;
  constructor(private courseService: CourseService,
    private formBuilder: FormBuilder) { }

    search(evt = 1){
      Notiflix.Block.Dots(`.table`);
      const postData = {
          q: this.searchFrm.controls.q.value
      }
      this.courseService.listCourses(evt, postData).subscribe(res=>{
        Notiflix.Block.Remove(`.table`);
      }, err=>{
        Notiflix.Block.Remove(`.table`);
      });
    }

    resetSearch(){
      this.searchFrm.controls.q.setValue('');
      this.search();
    }
  ngOnInit(): void {
    this.courses$= this.courseService.courses;

    this.searchFrm = this.formBuilder.group({
      q: [null, []]
    });
  }

}
