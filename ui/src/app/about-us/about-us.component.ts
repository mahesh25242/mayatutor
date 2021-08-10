import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { GoogleObj, GoogleTransulateService } from '../lib/services';
import { BreadCrumbsService } from '../shared-module/components/bread-crumbs/bread-crumbs.component';
import { data } from './data';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
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
        name: 'About Us',
      }
    ]);

    this.data$ = this.googleTransulateService.lang.pipe(mergeMap(res=>{
      if(res != 'en'){
        try{
          let q: string[] = [];

          const googleObj: GoogleObj = {
            q: [data.first, data.second, data.abt_text, data.reg_office_addr],
            target: res
          };
          return this.googleTransulateService.googleTransulate(googleObj).pipe(map((trans:any)=>{
            let data = {
              first: trans.data.translations[0].translatedText,
              second: trans.data.translations[1].translatedText,
              abt_text: trans.data.translations[2].translatedText,
              reg_office_addr: trans.data.translations[3].translatedText,
            };
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
