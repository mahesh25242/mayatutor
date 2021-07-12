import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private _modalService: NgbModal,
    private route: ActivatedRoute) { }

  get f() { return this.searchFrn.controls; }
  search(){

    this.userService.getloggedUser.pipe(takeUntil(this.unsubscribe$)).subscribe(user=>{
        if(user || this.f.loc.value || this.f.phone.value){
          this.router.navigate([`/teacher/lookups${(this.f.q.value) ? `/${this.f.q.value}` : ``}`, [this.f.loc.value, this.f.phone.value]]);
        }else{
          const searchPopUp = this._modalService.open(CollectDetailComponent);
          searchPopUp.componentInstance.searchFrn = this.searchFrn;

          searchPopUp.result.then((data) => {

            // on close
          }, (reason) => {
            this.unsubscribe$.next();
            this.unsubscribe$.complete();
            // on dismiss
          });


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

    this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe(res=>{
      if(res?.q)
        this.f.q.setValue(res?.q);

      if(res){
        if(res[0] && res[0] != 'null'){
          this.f.loc.setValue(res[0]);
        }
        if(res[1] && res[1] != 'null'){
          this.f.phone.setValue(res[1]);
        }
      }

    })
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
