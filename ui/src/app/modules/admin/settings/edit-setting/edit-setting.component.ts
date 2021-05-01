import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Setting } from 'src/app/lib/interfaces';
import { SettingService } from 'src/app/lib/services';
import Notiflix from "notiflix";
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-setting',
  templateUrl: './edit-setting.component.html',
  styleUrls: ['./edit-setting.component.scss']
})
export class EditSettingComponent implements OnInit {
  settingFrm: FormGroup;
  @Input() setting: Setting;
  saveSubScr: Subscription;
  constructor(private formBuilder: FormBuilder,
    public modal: NgbActiveModal,
    private settingService: SettingService) { }

  get f(){ return this.settingFrm.controls; }
  save(){
    Notiflix.Loading.Standard();

    const postData = {
      id: this.f.id.value,
      value: this.f.value.value,
    };
    this.saveSubScr = this.settingService.saveSetting(postData).pipe(mergeMap(res=> this.settingService.getSettings())).subscribe(res=>{
      Notiflix.Notify.Success(`Successfully saved `);
      Notiflix.Loading.Remove();
      this.modal.close();
    }, error=>{
      for(let result in this.settingFrm.controls){
        if(error.error.errors[result]){
          this.settingFrm.controls[result].setErrors({ error: error.error.errors[result] });
        }else{
          this.settingFrm.controls[result].setErrors(null);
        }
      }

      Notiflix.Loading.Remove();
      Notiflix.Notify.Failure(`Sorry unexpected error occur pelase try again `);

    })
  }
  ngOnInit(): void {
    this.settingFrm = this.formBuilder.group({
      id: [this.setting.id, []],
      name: [this.setting.name, []],
      value: [this.setting.value, []],
    });
  }

}
