import { Component, Input, OnInit } from '@angular/core';
import { chunk, find, first } from 'lodash';
import { from, interval, merge, Observable, of } from 'rxjs';
import { combineAll, concatAll, map, mergeAll, mergeMap, pairwise, take, tap } from 'rxjs/operators';
import { GoogleObj, GoogleTransulateService } from 'src/app/lib/services';
import { data } from './data';

@Component({
  selector: 'app-mayatutor-terms',
  templateUrl: './mayatutor-terms.component.html',
  styleUrls: ['./mayatutor-terms.component.scss']
})
export class MayatutorTermsComponent implements OnInit {
  @Input() active:number = 1;
  data$: Observable<any>;
  constructor(private googleTransulateService: GoogleTransulateService) { }
  ngOnInit(): void {





    this.data$ = this.googleTransulateService.lang.pipe(mergeMap(res=>{
      if(res != 'en'){
        return from(data).pipe(mergeMap(langItem=>{

          let q: string[] = [langItem.title, ...langItem.points];

          if(langItem.refund){
            q = [...q, langItem.refund.title, ...langItem.refund.points];
          }

          const googleObj: GoogleObj = {
            q: q,
            target: res
          };
          return this.googleTransulateService.googleTransulate(googleObj).pipe(map((trans:any)=>{
            let langData = {
              title: '',
              tab: langItem.tab,
              points:[]
            };
            trans.data.translations.map((res:any, idx)=>{
              if(!idx){
                langData.title = res.translatedText;
              }else{
                langData.points = [...langData.points, res.translatedText ]
              }
            })
            return langData
          }));
        }), pairwise()).pipe(map(res=>{
          let teacherTerm = find(res, {tab: 2});
          const points = chunk(teacherTerm.points, 32);
          teacherTerm.points = points[0];
          const refundTitle = points[1].shift();
          teacherTerm = {...teacherTerm, ...{refund: { title: refundTitle, points: points[1] } }};

          return [res[0], teacherTerm]

        }))




        // let q: string[] = [];
        // this.data.map(res=>{
        //   q = [...q, res.]
        // })


      }else{
        return of(data)
      }

    })).pipe(tap(console.log));


  }

}
