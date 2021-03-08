import { Component } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import Notiflix from 'notiflix';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mayaTutor';

  constructor(public router: Router,
    private swUpdate: SwUpdate,) {

      swUpdate.available.subscribe(event => {
        console.log('current version is', event.current);
        console.log('available version is', event.available);
      });
      swUpdate.activated.subscribe(event => {
        console.log('old version was', event.previous);
        console.log('new version is', event.current);
      });

      swUpdate.available.subscribe(event => {
          swUpdate.activateUpdate().then(() => this.updateApp());
      });



    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {


          Notiflix.Block.Hourglass('#innerConatiner');
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          Notiflix.Block.Remove('#innerConatiner');
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  updateApp(){
    document.location.reload();
    console.log("The app is updating right now");

   }
}
