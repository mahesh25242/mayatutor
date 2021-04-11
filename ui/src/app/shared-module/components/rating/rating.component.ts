import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {faUser,faClock } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { User, Rating } from 'src/app/lib/interfaces';
import { StudentService } from '../../../lib/services';
import Notiflix from "notiflix";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit, OnDestroy {
  @Input() rating: Rating;
  @Input() readonly: boolean;
  @Input() teacherId: number;
  unsubscrSetRate: Subscription;
  currentRate: number = 0 ;

    setRating(evt){
      const postData = {
        user_id:  this.teacherId,
        rate: evt
      }
      Notiflix.Block.Pulse('ngb-rating');
      this.unsubscrSetRate = this.studentService.setRating(postData).subscribe(res=>{
          this.rating = res;
          Notiflix.Notify.Success(`Thank you for rating`);
          Notiflix.Block.Remove('ngb-rating');
      }, err=>{
        Notiflix.Notify.Failure('Sorry, please try again later');
        Notiflix.Block.Remove('ngb-rating');
      });
    }
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    if(this.rating)
      this.currentRate = this.rating.rate / this.rating.tot_users;
  }

  ngOnDestroy(){
    this.unsubscrSetRate && this.unsubscrSetRate.unsubscribe();
  }
}
