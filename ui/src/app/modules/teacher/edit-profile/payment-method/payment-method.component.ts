import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ControlContainer, FormGroupName } from '@angular/forms';

@Component({
  //selector: 'app-payment-method',
  selector: '[formGroup] app-payment-method,[formGroupName] app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

  paymentFormGroup: FormGroup;


  constructor(private controlContainer: ControlContainer) {

  }

  get f() { return this.paymentFormGroup.controls; }

  ngOnInit(): void {
     this.paymentFormGroup = this.controlContainer.control as FormGroup;
  }

}
