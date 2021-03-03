import { Component, OnInit } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-lay-out',
  templateUrl: './lay-out.component.html',
  styleUrls: ['./lay-out.component.scss']
})
export class LayOutComponent implements OnInit {

  constructor(public router: Router) {



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
