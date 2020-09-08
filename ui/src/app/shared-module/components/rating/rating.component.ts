import { Component, OnInit, Input } from '@angular/core';
import {faUser,faClock } from '@fortawesome/free-solid-svg-icons';
import { User, Rating } from 'src/app/lib/interfaces';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() rating: Rating;
  @Input() readonly: boolean;
    currentRate ;

  constructor() { }

  ngOnInit(): void {
    this.currentRate = this.rating.rate / this.rating.tot_users;
  }

}
