import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PlyrComponent } from 'ngx-plyr';
// import videojs from 'video.js';



@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnDestroy {

  @ViewChild(PlyrComponent)
  plyr: PlyrComponent;

  // or get it from plyrInit event
  player: Plyr;
  @Input() videoSources: {
    source : Plyr.Source[],
    poster?: string
  };

  // videoSources: Plyr.Source[] = [
  //   {
  //     src: 'https://www.youtube.com/watch?v=lVRm7gN3g9k&modestbranding=1&showinfo=0&rel=0',
  //     provider: 'youtube',
  //   },
  // ];

  played(event: Plyr.PlyrEvent) {
   // console.log('played', event);
  }

  play(): void {
    this.player.play(); // or this.plyr.player.play()
  }
constructor(
  private elementRef: ElementRef,
) { }



ngOnInit(): void {
  // // instantiate Video.js
  // this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
  //   console.log('onPlayerReady', this);
  // });

}

ngOnDestroy() {
  // destroy player
  // if (this.player) {
  //   this.player.dispose();
  // }
}

}
