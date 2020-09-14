import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TeacherService } from 'src/app/lib/services';
import { Plan } from '../../../lib/interfaces';
@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  plans$ : Observable<Plan[]>;
  constructor(private teacherService : TeacherService) { }

  ngOnInit(): void {
    this.plans$ = this.teacherService.plans();
  }

}
