import { Component, Injectable, Input, OnInit } from '@angular/core';
import { last } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {Title} from "@angular/platform-browser";
import { environment } from '../../../../environments/environment';
export interface BC {
  name?: string,
  url?: string,
  meta?: any
}

@Injectable({
  providedIn: 'root'
})
export class BreadCrumbsService {
  bcs$: BehaviorSubject<BC[]> = new BehaviorSubject<BC[]>(null);

  constructor(private titleService:Title) { }
  get bcs(){
    return this.bcs$.asObservable().pipe(tap(res=>{
      const lbc = last(res);
      if(lbc?.name){
        this.titleService.setTitle(`${environment.siteName}: ${lbc.name}`);
      }else{
        this.titleService.setTitle(`${environment.siteName}`);
      }
    }));
  }

}



@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.scss']
})
export class BreadCrumbsComponent implements OnInit {
  @Input() hide:boolean;
  bcs: Observable<BC[]>;

  constructor(private breadCrumbsService: BreadCrumbsService) { }

  ngOnInit(): void {
    this.bcs = this.breadCrumbsService.bcs;
  }

}
