import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {faSearch } from '@fortawesome/free-solid-svg-icons';
import { TeacherService } from 'src/app/lib/services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  faSearch = faSearch;
  searchFrn: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private teacherService: TeacherService) { }

  get f() { return this.searchFrn.controls; }
  search(){
    this.teacherService.searchTeachers(this.f.q.value).subscribe();
  }
  ngOnInit(): void {
    this.searchFrn = this.formBuilder.group({
      q: [null, []]
    });
  }

}
