import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { GoogleTransulateService, TeacherService, UserService } from 'src/app/lib/services';
import { find } from 'lodash';

@Component({
  selector: 'app-google-language-selection',
  templateUrl: './google-language-selection.component.html',
  styleUrls: ['./google-language-selection.component.scss']
})
export class GoogleLanguageSelectionComponent implements OnInit, OnDestroy {
  faSearch = faSearch;
  languageFrm: FormGroup;
  languages$: Observable<any>;
  private unsubscribe$ = new Subject;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private googleTransulateService: GoogleTransulateService) { }

  get f() { return this.languageFrm.controls; }

  setLanguage(){
    this.googleTransulateService.saveLanguage(this.languageFrm.controls.language.value)
  }
  ngOnInit(): void {

    this.languageFrm = this.formBuilder.group({
      language: [null, []]
    });

    this.googleTransulateService.lang.subscribe(res=>{
      this.languageFrm.controls.language.setValue(res);
    })
    this.languages$ = this.googleTransulateService.googleLanguages({
      target: 'en'
    }).pipe(map((res:any)=>{
      return res?.data?.languages
    }));

  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
