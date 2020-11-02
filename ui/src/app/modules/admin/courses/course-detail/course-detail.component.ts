import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course, CourseModule } from 'src/app/lib/interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModuleLaunchComponent } from 'src/app/shared-module/components/module-launch/module-launch.component';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  course: Course;
  constructor(private route: ActivatedRoute,
    private _modalService: NgbModal,) { }


  ngOnInit(): void {
    this.course = this.route.snapshot.data["course"];
  }





}
