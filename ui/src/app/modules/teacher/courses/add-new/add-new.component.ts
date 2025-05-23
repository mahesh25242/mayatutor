import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {  CourseService, TeacherService } from 'src/app/lib/services';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Notiflix from "notiflix";
import { mergeMap, map } from 'rxjs/operators';
import { Course } from 'src/app/lib/interfaces';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {
  @Input() course: Course;
  searchFrm: FormGroup;
  faYoutube = faYoutube;
  createCourseFrm: FormGroup;
  constructor(public modal: NgbActiveModal,
    private courseService: CourseService,
    private formbuilder: FormBuilder,
    private teacherService: TeacherService) { }
    tags :any = [];
  get f() { return this.createCourseFrm.controls; }

  ngOnInit(): void {

    this.createCourseFrm = this.formbuilder.group({
      name: [null, [ Validators.required]],
      price: [null, [ Validators.required]],
      demo_video_url: [null, [ Validators.required]],
      image: [null, [ Validators.required]],
      description: [null, [ Validators.required]],
      meeting_url: [null, [ ]],
      live_class: [null, [ Validators.required]],
      live_class_url: [null, [ Validators.required]],
      news: [null, [ Validators.required]],
      id: [null, []],
      tag_name: [null, []]
    });

    if(this.course){
      this.createCourseFrm.patchValue({
        name: this.course.name,
        price: this.course.price,
        demo_video_url: this.course.demo_video_url,
        image: this.course.image,
        description: this.course.description,
        meeting_url: this.course.meeting_url,
        live_class: this.course.live_class,
        live_class_url: this.course.live_class_url,
        news: this.course.news,
        id: this.course.id,
        tag_name: this.course.course_tag
      });
    }
  }

  onFileInput(files: FileList){
    this.f.image.setValue(files.item(0));
  }
  createCourse(){
    const formData = new FormData();
    formData.append('id', `${(this.f.id.value) ? this.f.id.value : ''}`);
    formData.append('name', `${(this.f.name.value) ? this.f.name.value : ''}`);
    formData.append('price', `${ (this.f.price.value) ? this.f.price.value : 0 }`);
    formData.append('demo_video_url', `${ (this.f.demo_video_url.value) ? this.f.demo_video_url.value : '' }`);
    if(this.f.image.value)
      formData.append('image', this.f.image.value);
    formData.append('description', `${ (this.f.description.value) ? this.f.description.value : '' }`);
    formData.append('meeting_url', `${ (this.f.meeting_url.value) ? this.f.meeting_url.value : '' }`);
    formData.append('live_class', `${ (this.f.live_class.value) ? 1 : 0 }`);
    formData.append('live_class_url', `${ (this.f.live_class_url.value) ? this.f.live_class_url.value : '' }`);
    formData.append('news', `${ (this.f.news.value) ? this.f.news.value : '' }`);
    formData.append('tag_name', `${ (this.f.tag_name.value) ? JSON.stringify(this.f.tag_name.value) : '' }`);

    Notiflix.Block.Pulse('app-add-new');
    this.courseService.createCourse(formData).pipe(mergeMap(res=>{
      const postData ={
        q: this.searchFrm.controls.q.value
      }


      return this.teacherService.listCourses(1, postData).pipe(map(courses=>{
        return res;
      }))
    })).subscribe(res=>{
      if(this.f.id.value)
        Notiflix.Notify.Success(`Successfully updated ${this.f.name.value}. This course will be active with in 24 hours.`);
      else
        Notiflix.Notify.Success(`Successfully saved ${this.f.name.value}.  This course will be active with in 24 hours. `);

      Notiflix.Block.Remove('app-add-new');
      this.modal.close();
    }, error=>{
      for(let result in this.createCourseFrm.controls){
        if(error.error.errors[result]){
          this.createCourseFrm.controls[result].setErrors({ error: error.error.errors[result] });
        }else{
          this.createCourseFrm.controls[result].setErrors(null);
        }
      }
      Notiflix.Block.Remove('app-add-new');
    });
  }

}
