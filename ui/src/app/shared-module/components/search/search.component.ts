import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TeacherService, UserService } from 'src/app/lib/services';
import { CollectDetailComponent } from './collect-detail/collect-detail.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  faSearch = faSearch;
  searchFrn: FormGroup;
  private unsubscribe$ = new Subject;
  constructor(private formBuilder: FormBuilder,
    private teacherService: TeacherService,
    private router: Router,
    private userService: UserService,
    private _modalService: NgbModal,) { }

  get f() { return this.searchFrn.controls; }
  search(){
    this.userService.getloggedUser.pipe(takeUntil(this.unsubscribe$)).subscribe(user=>{
        if(user){
          this.router.navigate([`/teacher/lookups${(this.f.q.value) ? `/${this.f.q.value}` : ``}`]);
        }else{
          const searchPopUp = this._modalService.open(CollectDetailComponent);
          searchPopUp.componentInstance.searchFrn = this.searchFrn;

           searchPopUp.componentInstance.search.pipe(takeUntil(this.unsubscribe$)).subscribe(res=>{
            this.router.navigate([`/teacher/lookups${(this.f.q.value) ? `/${this.f.q.value}` : ``}`, [this.f.loc.value, this.f.phone.value]]);
            searchPopUp.close();
          });
        }
    });

    //this.teacherService.searchTeachers(this.f.q.value).subscribe();
  }
  ngOnInit(): void {
    this.searchFrn = this.formBuilder.group({
      q: [null, []],
      loc: [null, []],
      phone: [null, []],
    });
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
