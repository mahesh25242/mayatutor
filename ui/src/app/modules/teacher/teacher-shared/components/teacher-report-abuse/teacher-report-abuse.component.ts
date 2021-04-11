import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { User } from 'src/app/lib/interfaces';
import { TeacherService } from 'src/app/lib/services';
import Notiflix from "notiflix";

@Component({
  selector: 'app-teacher-report-abuse',
  templateUrl: './teacher-report-abuse.component.html',
  styleUrls: ['./teacher-report-abuse.component.scss']
})
export class TeacherReportAbuseComponent implements OnInit {
  @Input() user:User;
  closeResult = '';
  reportFrm : FormGroup;
  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private teacherService: TeacherService) { }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'});
  }
  get f(){
    return this.reportFrm.controls;
  }
  sent(modal:any = null){
    Notiflix.Block.Pulse('#report-abuse-body');
      const postData = {
        name: this.reportFrm.controls.name.value,
        info: this.reportFrm.controls.info.value,
        user_id: this.user.id,
      }
      this.teacherService.reportAbuse(postData).subscribe(res=>{
        console.log(res)
        Notiflix.Block.Remove('#report-abuse-body');
        Notiflix.Notify.Success(`Successfully reported`);
        modal.close();
        this.reportFrm.reset();
      }, error=>{

        for(let result in this.reportFrm.controls){
          if(error.error.errors && error.error.errors[result]){
            this.reportFrm.controls[result].setErrors({ error: error.error.errors[result] });
          }else{
            this.reportFrm.controls[result].setErrors(null);
          }
        }

        Notiflix.Block.Remove('#report-abuse-body');
      })
  }


  ngOnInit(): void {
    this.reportFrm = this.formBuilder.group({
      name: [null, []],
      info: [null, []],
    });
  }

}
