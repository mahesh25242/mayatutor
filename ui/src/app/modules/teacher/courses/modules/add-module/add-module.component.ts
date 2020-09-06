import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VideoPreviewComponent } from './video-preview/video-preview.component';
import { mergeMap, map } from 'rxjs/operators';
import { TeacherService } from 'src/app/lib/services';
import { Course } from 'src/app/lib/interfaces';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss']
})
export class AddModuleComponent implements OnInit {
  addModuleFrm: FormGroup;
  @Input() course: Course;

  constructor(private formBuilder: FormBuilder,
    private _modalService: NgbModal,
    private teacherService: TeacherService) { }

  get f(){ return this.addModuleFrm.controls;}

  onFileInput(files: FileList){
    this.f.pdf.setValue(files.item(0));
  }

  previewVideo(){
    const activeModal = this._modalService.open(VideoPreviewComponent,{
      size:'lg'
    });
    activeModal.componentInstance.video = {
      source : [
        {
          src: `${this.f.video_link.value}&modestbranding=1&showinfo=0&rel=0`,
          provider: 'youtube',
        },
      ]
    };

    activeModal.componentInstance.title = this.f.name.value;
  }

  addModule(){
    const formData = new FormData();
    formData.append('id', `${(this.f.id.value) ? this.f.id.value : ''}`);
    formData.append('course_id', `${this.course?.id}`);
    formData.append('name', `${(this.f.name.value) ? this.f.name.value : ''}`);
    if(this.f.pdf.value)
      formData.append('pdf', this.f.pdf.value);

    formData.append('video_link', `${(this.f.video_link.value) ? this.f.video_link.value : ''}`);

    this.teacherService.createModule(this.course.id, formData).pipe(mergeMap(res=>{
      return this.teacherService.listModules(this.course.id).pipe(map(modules=>{
        return res;
      }))
    })).subscribe()

  }

  ngOnInit(): void {
    this.addModuleFrm = this.formBuilder.group({
      id: [null, [ ]],
      name: [null, [ Validators.required]],
      pdf: [null, [ Validators.required]],
      video_link: ['https://www.youtube.com/watch?v=BCk2TSx--hk&t=3s', [ Validators.required]]
    });
  }

}
