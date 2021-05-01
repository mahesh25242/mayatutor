import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { Banner } from 'src/app/lib/interfaces';
import { GeneralService } from 'src/app/lib/services';
import Notiflix from "notiflix";
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-home-video',
  templateUrl: './edit-home-video.component.html',
  styleUrls: ['./edit-home-video.component.scss']
})
export class EditHomeVideoComponent implements OnInit {
  @Input() video: Banner;
  @Output() reloadVideos = new EventEmitter();

  homeVideoFrm: FormGroup;
  videos$: Observable<Banner[]>;
  saveSubscr: Subscription;
  constructor(private formBuilder: FormBuilder,
    private generalService: GeneralService,
    public modal: NgbActiveModal,) { }

    get f(){ return this.homeVideoFrm.controls}
  videos(){
    return this.generalService.getAllHomeVideo();
  }
  save(){
    Notiflix.Loading.Standard();
    const postData = {
      file_path: this.f.file_path.value,
      sort_order: this.f.sort_order.value,
      type: this.f.type.value,
      description: this.f.description.value,
      name: this.f.name.value,
      id: this.f.id.value,
    };
    this.saveSubscr = this.generalService.saveHomeVideo(postData).subscribe(res=>{
      Notiflix.Notify.Success(`Successfully saved `);
      this.reloadVideos.emit();
      Notiflix.Loading.Remove();
    }, error=>{
      Notiflix.Loading.Remove();
    });
  }
  ngOnInit(): void {

    this.homeVideoFrm = this.formBuilder.group({
      id: [this.video.id, []],
      name: [this.video.name, []],
      description: [this.video.description, []],
      file_path: [this.video.file_path, []],
      sort_order: [this.video.sort_order, []],
      type: [this.video.type, []],
    });
  }

}
