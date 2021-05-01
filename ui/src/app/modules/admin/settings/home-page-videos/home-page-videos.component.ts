import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { Banner } from 'src/app/lib/interfaces';
import { GeneralService } from 'src/app/lib/services';
import { EditHomeVideoComponent } from './edit-home-video/edit-home-video.component';

@Component({
  selector: 'app-home-page-videos',
  templateUrl: './home-page-videos.component.html',
  styleUrls: ['./home-page-videos.component.scss']
})
export class HomePageVideosComponent implements OnInit, OnDestroy {
  public videos$: BehaviorSubject<Banner[]> = new BehaviorSubject<Banner[]>(null);
  homeVideoFrm: FormGroup;

  reloadDaatSubScr: Subscription;
  fetchDaatSubScr: Subscription;
  constructor(private formBuilder: FormBuilder,
    private generalService: GeneralService,
    private _modalService: NgbModal) { }

    editVideo(video: Banner = null){
      const activeModal = this._modalService.open(EditHomeVideoComponent,{ size: 'lg'});
      activeModal.componentInstance.video = video;

      this.reloadDaatSubScr = activeModal.componentInstance.reloadVideos.pipe(mergeMap(res=>{
        return this.generalService.getAllHomeVideo().pipe(tap(videos=>{
          this.videos$.next(videos);
        }))
      })).subscribe(res=>{
        console.log(res)
        activeModal.close();
      });

    }


  ngOnInit(): void {
    this.fetchDaatSubScr = this.generalService.getAllHomeVideo().subscribe(res=>{
      this.videos$.next(res);
    });

  }

  ngOnDestroy(){
    this.reloadDaatSubScr && this.reloadDaatSubScr.unsubscribe();
    this.fetchDaatSubScr && this.fetchDaatSubScr.unsubscribe();
  }

}
