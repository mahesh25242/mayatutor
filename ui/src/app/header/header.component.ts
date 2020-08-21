import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignInComponent } from '../sign-in/sign-in.component';
import { UserService } from '../lib/services';
import { Subscription, Observable } from 'rxjs';
import { User } from '../lib/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedSubScrioption: Subscription;
  loggedUser$: Observable<User>;

  constructor(private _modalService: NgbModal,
    private userService: UserService) { }

  ngOnInit(): void {
    this.loggedUser$ = this.userService.getloggedUser;
    this.loggedSubScrioption = this.userService.authUser().subscribe();
  }

  signIn(){
    const activeModal = this._modalService.open(SignInComponent);
    //activeModal.componentInstance.isEdit = false;
  }

  ngOnDestroy(){
    if(this.loggedSubScrioption){
      this.loggedSubScrioption.unsubscribe();
    }
  }
}
