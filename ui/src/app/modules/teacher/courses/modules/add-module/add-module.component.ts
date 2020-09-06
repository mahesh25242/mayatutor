import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VideoPreviewComponent } from './video-preview/video-preview.component';
import { mergeMap, map } from 'rxjs/operators';
import { TeacherService } from 'src/app/lib/services';
import { Course, CourseModule } from 'src/app/lib/interfaces';
import Notiflix from "notiflix";

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.scss']
})
export class AddModuleComponent implements OnInit, OnChanges {
  addModuleFrm: FormGroup;
  @Input() course: Course;
  @Input() module: CourseModule;
  @Output() resetEdit = new EventEmitter<boolean>();

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
          src: `${this.f.video_url.value}&modestbranding=1&showinfo=0&rel=0`,
          provider: 'youtube',
        },
      ]
    };

    activeModal.componentInstance.title = this.f.name.value;
  }

  addModule(){
    Notiflix.Block.Pulse('app-add-module form');
    const formData = new FormData();
    formData.append('id', `${(this.f.id.value) ? this.f.id.value : ''}`);
    formData.append('course_id', `${this.course?.id}`);
    formData.append('name', `${(this.f.name.value) ? this.f.name.value : ''}`);
    if(this.f.pdf.value)
      formData.append('pdf', this.f.pdf.value);

    formData.append('video_url', `${(this.f.video_url.value) ? this.f.video_url.value : ''}`);

    this.teacherService.createModule(this.course.id, formData).pipe(mergeMap(res=>{
      return this.teacherService.listModules(this.course.id).pipe(map(modules=>{
        return res;
      }))
    })).subscribe(res=>{
      if(this.f.id.value)
        Notiflix.Notify.Success(`Successfully updated ${this.f.name.value}`);
      else
        Notiflix.Notify.Success(`Successfully saved ${this.f.name.value} `);

        this.addModuleFrm.reset();

      Notiflix.Block.Remove('app-add-module form');
    }, error=>{
      for(let result in this.addModuleFrm.controls){
        if(error.error.errors[result]){
          this.addModuleFrm.controls[result].setErrors({ error: error.error.errors[result] });
        }else{
          this.addModuleFrm.controls[result].setErrors(null);
        }
      }
      Notiflix.Block.Remove('app-add-module form');
    })

  }

  cancelEdit(){
    this.resetEdit.emit(null)
  }

  ngOnInit(): void {
    this.addModuleFrm = this.formBuilder.group({
      id: [null, [ ]],
      name: [null, [ Validators.required]],
      pdf: [null, [ Validators.required]],
      video_url: [null, [ Validators.required]]
    });

  }

  ngOnChanges(){
    this.addModuleFrm.patchValue({
      id: this.module?.id,
      name: this.module?.name,
      pdf: this.module?.pdf,
      video_url: this.module?.video_url
    });
  }



}
