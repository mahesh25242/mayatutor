import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Banner } from 'src/app/lib/interfaces';
import { GeneralService } from 'src/app/lib/services';


@Component({
  selector: 'app-home-middle',
  templateUrl: './home-middle.component.html',
  styleUrls: ['./home-middle.component.scss']
})
export class HomeMiddleComponent implements OnInit {
  videos$: Observable<Banner[]>;

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {

    this.videos$ = this.generalService.getAllHomeVideo().pipe(map(res=>{
      res.map(r=>{
        r.video =  {
          source : [
            {
              src: `${r.file_path}&modestbranding=1&showinfo=0&rel=0`,
              provider: 'youtube',
            },
          ]
        };
      });
      return res;
    }));
  }

}
