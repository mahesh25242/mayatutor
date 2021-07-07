import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { UserService } from '../lib/services';
import Notiflix from "notiflix";


@Component({
  selector: 'app-user-activation',
  templateUrl: './user-activation.component.html',
  styleUrls: ['./user-activation.component.scss']
})
export class UserActivationComponent implements OnInit {
  uActivation$: Observable<any>;
  constructor(private route: ActivatedRoute,
    private userService:UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.uActivation$ = this.route.params.pipe(mergeMap(prms=>{
      return this.userService.activateUser({key: prms?.key}).pipe(catchError(res=> {
        Notiflix.Notify.Failure('Sorry invalid activation key');
        this.router.navigate([`/`]);
        return throwError(res);
      } ));
    })).pipe(tap(res=>{
      Notiflix.Notify.Success('Successfully activated. Please login again');
      this.router.navigate([`/`]);
    }))

  }

}
