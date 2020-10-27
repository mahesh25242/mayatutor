import { Component, OnInit } from '@angular/core';
import { BreadCrumbsService } from '../shared-module/components/bread-crumbs/bread-crumbs.component';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor(private breadCrumbsService: BreadCrumbsService) { }

  ngOnInit(): void {
    this.breadCrumbsService.bcs$.next([
      {
        url: '/',
        name: 'Home',
      },
      {
        name: 'About Us',
      }
    ]);
  }

}
