import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { PlyrModule } from 'ngx-plyr';

import { PlayerComponent } from './components/player/player.component';

@NgModule({
  declarations: [
    PlayerComponent
  ],
  imports: [
    CommonModule,
    PlyrModule
  ],
  exports:[
    PlayerComponent
  ]
})
export class PlayerModuleModule { }
