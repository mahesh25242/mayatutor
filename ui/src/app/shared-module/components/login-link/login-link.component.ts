import { Component, HostListener, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignInComponent } from 'src/app/sign-in/sign-in.component';

@Component({
  selector: 'app-login-link',
  templateUrl: './login-link.component.html',
  styleUrls: ['./login-link.component.scss']
})
export class LoginLinkComponent implements OnInit {

  @HostListener('click', ['$event.target'])
  onClick(target) {
    this.signIn()
  }
  constructor(private _modalService: NgbModal,) { }

  signIn(){
    const activeModal = this._modalService.open(SignInComponent,{
      size:'lg'
    });
    //activeModal.componentInstance.isEdit = false;
  }
  ngOnInit(): void {
  }

}
