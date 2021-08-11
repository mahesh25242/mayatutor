import { Component, OnInit } from '@angular/core';
import { chunk } from 'lodash';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { GoogleTransulateService, GoogleObj } from '../lib/services';
import { BreadCrumbsService } from '../shared-module/components/bread-crumbs/bread-crumbs.component';
import { data } from './data';
@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})

export class HowItWorksComponent implements OnInit {
  data$: Observable<any>;
  constructor(private breadCrumbsService: BreadCrumbsService,
    private googleTransulateService: GoogleTransulateService) { }

  ngOnInit(): void {
    this.breadCrumbsService.bcs$.next([
      {
        url: '/',
        name: 'Home',
      },
      {
        name: 'How It Work',
      }
    ]);

    this.data$ = this.googleTransulateService.lang.pipe(mergeMap(res=>{
      if(res != 'en'){
        try{
          let q: string[] = [];
          data.map(itm=>{
            q = [...q, itm.q, itm.ans]
          })
          const googleObj: GoogleObj = {
            q: q,
            target: res
          };
          return this.googleTransulateService.googleTransulate(googleObj).pipe(map((trans:any)=>{
            let data = [];

            chunk(trans.data.translations, 2).map((res:any)=>{

              data =[...data, {q: res[0].translatedText, ans: res[1].translatedText}]
            })
            return data
          }));
        }catch(e){
          console.log(e)
        }



        // let q: string[] = [];
        // this.data.map(res=>{
        //   q = [...q, res.]
        // })


      }else{
        return of(data)
      }

    }))


  }

}
