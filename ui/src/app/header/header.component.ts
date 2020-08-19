import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _modalService: NgbModal) { }

  ngOnInit(): void {
  }

  signIn(){
    const activeModal = this._modalService.open(SignInComponent);
    //activeModal.componentInstance.isEdit = false;
  }

}
