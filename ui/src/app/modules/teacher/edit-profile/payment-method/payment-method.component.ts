import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ControlContainer, FormGroupName } from '@angular/forms';
import { TeacherService, UserService } from 'src/app/lib/services';
import Notiflix from "notiflix";
import { mergeMap } from 'rxjs/operators';

@Component({
  //selector: 'app-payment-method',
  selector: '[formGroup] app-payment-method,[formGroupName] app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

  paymentFormGroup: FormGroup;


  constructor(private controlContainer: ControlContainer,
    private teacherService : TeacherService,
    private userService : UserService) {

  }

  get f() { return this.paymentFormGroup.controls; }

  ngOnInit(): void {
     this.paymentFormGroup = this.controlContainer.control as FormGroup;
  }

  onFileInput(files: FileList, field, flName: string =''){

    Notiflix.Block.Merge({svgSize:'20px',});
    Notiflix.Block.Dots(`.${flName}-up-btn`);


    const formData = new FormData();
    formData.append(`${flName}`, files.item(0));
    //avatar-img
    this.teacherService.updatePaymentQRCode(formData).pipe(mergeMap(res=>{
      return this.userService.authUser();
    })).subscribe(res=>{
      Notiflix.Notify.Success(`Successfully changed qrcode `);
      Notiflix.Block.Remove(`.${flName}-up-btn`);
    }, error=>{
      Notiflix.Notify.Failure(`Sorry qr code can't updated `);
      Notiflix.Block.Remove(`.${flName}-up-btn`);
    });

    this.teacherService.updatePaymentQRCode();
    field.setValue(files.item(0));
  }

}
