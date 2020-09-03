import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TeacherService } from 'src/app/lib/services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {
  createCourseFrm: FormGroup;
  constructor(public modal: NgbActiveModal,
    private teacherService: TeacherService,
    private formbuilder: FormBuilder) { }

    get f() { return this.createCourseFrm.controls; }
  ngOnInit(): void {
    this.createCourseFrm = this.formbuilder.group({
      name: [null, [ Validators.required]],
      price: [null, [ Validators.required]],
      demo_video_url: [null, [ Validators.required]],
      image: [null, [ Validators.required]],
      description: [null, [ Validators.required]],
      live_class: [null, [ Validators.required]],
      live_class_url: [null, [ Validators.required]],
      news: [null, [ Validators.required]],
    });
  }

  createCourse(){
    const formData = new FormData();
    formData.append('name', `${(this.f.name.value) ? this.f.name.value : ''}`);
    formData.append('price', `${ (this.f.price.value) ? this.f.price.value : '' }`);
    formData.append('demo_video_url', `${ (this.f.demo_video_url.value) ? this.f.demo_video_url.value : '' }`);
    formData.append('image', `${ (this.f.image.value) ? this.f.image.value : '' }`);
    formData.append('description', `${ (this.f.description.value) ? this.f.description.value : '' }`);
    formData.append('live_class', `${ (this.f.live_class.value) ? this.f.live_class.value : '' }`);
    formData.append('live_class_url', `${ (this.f.live_class_url.value) ? this.f.live_class_url.value : '' }`);
    formData.append('news', `${ (this.f.news.value) ? this.f.news.value : '' }`);


    this.teacherService.createCourse(formData).subscribe();
  }

}
