import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService, GeneralService } from 'src/app/lib/services';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit, OnDestroy {


  constructor(private userSerivce: UserService,
    private generalService: GeneralService) { }

  ngOnInit(): void {
    this.generalService.isAdminRoute$.next(true);
  }

  ngOnDestroy(){
    this.generalService.isAdminRoute$.next(false);
  }
}
