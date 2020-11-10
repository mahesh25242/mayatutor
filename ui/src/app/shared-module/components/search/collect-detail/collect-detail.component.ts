import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-collect-detail',
  templateUrl: './collect-detail.component.html',
  styleUrls: ['./collect-detail.component.scss']
})
export class CollectDetailComponent implements OnInit {
  @Input() searchFrn: FormGroup;
  @Output() search = new EventEmitter();
  constructor(public modal: NgbActiveModal) { }
  get f(){ return this.searchFrn.controls; }
  ngOnInit(): void {

  }

}
