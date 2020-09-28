import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/lib/interfaces';


@Component({
  selector: 'app-list-teachers',
  templateUrl: './list-teachers.component.html',
  styleUrls: ['./list-teachers.component.scss']
})
export class ListTeachersComponent implements OnInit {
  teachers: User[];
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.teachers = this.route.snapshot.data["teachers"];
  }

}
