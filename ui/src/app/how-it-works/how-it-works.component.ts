import { Component, OnInit } from '@angular/core';
import { BreadCrumbsService } from '../shared-module/components/bread-crumbs/bread-crumbs.component';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {

  constructor(private breadCrumbsService: BreadCrumbsService) { }

  ngOnInit(): void {
    this.breadCrumbsService.bcs$.next([
      {
        url: '/',
        name: 'Home',
      },
      {
        name: 'How It Work',
      }
    ]);
  }

}
