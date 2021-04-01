import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../lib/services';
import { Subscription, Observable } from 'rxjs';
import { User } from '../../lib/interfaces';
import Notiflix from "notiflix";
import * as _ from 'lodash';
import { mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  faUser = faUser;
  loggedSubScrioption: Subscription;
  signOutSubscription: Subscription;
  loggedUser$: Observable<User>;
  showMenu:boolean = null;
  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.loggedUser$ = this.userService.getloggedUser;
    this.loggedSubScrioption = this.userService.authUser().subscribe(res=>{
      //_.find(res.role, (rl) => console.log(rl)); //check loaddash is working
    });
  }

  signOut(){
    Notiflix.Loading.Hourglass('please wait...');
    this.signOutSubscription = this.userService.setUserLogin({action:'SignOut'}).pipe(mergeMap(sRes=>{
      return this.userService.signOut().pipe(mergeMap(res=>{
        localStorage.removeItem('token');
        return this.userService.authUser();
      }))
    })).subscribe(res=>{
      Notiflix.Loading.Remove();
    }, err=>{
      Notiflix.Loading.Remove();
      this.router.navigate(['/']);
    });

  }

  ngOnDestroy(){
    if(this.loggedSubScrioption){
      this.loggedSubScrioption.unsubscribe();
    }

    if(this.signOutSubscription){
      this.signOutSubscription.unsubscribe();
    }
  }
}
