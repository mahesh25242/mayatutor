import { Component, OnInit } from '@angular/core';
import {  Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralService } from '../lib/services';

@Component({
  selector: 'app-lay-out',
  templateUrl: './lay-out.component.html',
  styleUrls: ['./lay-out.component.scss']
})
export class LayOutComponent implements OnInit {
  isAdminRoute$: Observable<boolean>;

  constructor(public router: Router,
    private generalService: GeneralService
) {

    this.isAdminRoute$ = this.generalService.isAdminRoute$.asObservable();

    //
   }

  ngOnInit(): void {
    const innerConatiner = document.getElementById('innerConatiner');

    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          innerConatiner.classList.remove('animate__fadeIn');

          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          innerConatiner.classList.add('animate__fadeIn');
          break;
        }
        default: {
          break;
        }
      }
    });



  }

}
