import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-register-terms',
  templateUrl: './register-terms.component.html',
  styleUrls: ['./register-terms.component.scss']
})
export class RegisterTermsComponent implements OnInit {

  @Output() accepted = new EventEmitter();
  @Input() type:string;
  active: number;

  constructor(public modal: NgbActiveModal) { }


  accept(){
    this.accepted.emit(true);
    this.modal.dismiss('cancel click');
  }

  ngOnInit(): void {
    this.active = (this.type == 'student') ? 1: 2;
  }

}
