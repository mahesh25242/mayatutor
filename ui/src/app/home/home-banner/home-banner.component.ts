import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Banner } from 'src/app/lib/interfaces';
import { GeneralService } from 'src/app/lib/services';


@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss']
})
export class HomeBannerComponent implements OnInit {
  banners$: Observable<Banner[]>;

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.banners$ = this.generalService.getAllBanner();
  }

}
