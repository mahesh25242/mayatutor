import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/lib/services';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {


  constructor(private userSerivce: UserService) { }

  ngOnInit(): void {

  }

}
