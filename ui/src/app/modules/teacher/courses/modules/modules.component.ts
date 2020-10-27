import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course, CourseModule } from 'src/app/lib/interfaces';
import { Observable, Subscription } from 'rxjs';
import { CourseService } from 'src/app/lib/services';
import { mergeMap, tap } from 'rxjs/operators';
import { faEdit, faTrash, faCheck, faWindowClose, faPlay, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import Notiflix from "notiflix";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VideoPreviewComponent } from './add-module/video-preview/video-preview.component';
import { CdkDragStart, CdkDragEnd, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BreadCrumbsService } from 'src/app/shared-module/components/bread-crumbs/bread-crumbs.component';


@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit, OnDestroy {
  faEdit = faEdit;
  faTrash = faTrash;
  faCheck = faCheck;
  faWindowClose = faWindowClose;
  faPlay =faPlay;
  faFilePdf = faFilePdf;

  isDragging:number = null;
  courseModule: CourseModule=null;

  course$: Observable<Course>;
  courseModules$: Observable<CourseModule[]>;
  deleteCouseModuleSuScr: Subscription;
  reOrderSubscription: Subscription;
  dragResetSubscription: Subscription;

  constructor(private route:ActivatedRoute,
    private courseService: CourseService,
    private _modalService: NgbModal,
    private breadCrumbsService: BreadCrumbsService) { }

  playVideo(module:CourseModule){
    const activeModal = this._modalService.open(VideoPreviewComponent,{
      size:'lg'
    });
    activeModal.componentInstance.video = {
      source : [
        {
          src: `${module.video_url}&modestbranding=1&showinfo=0&rel=0`,
          provider: 'youtube',
        },
      ]
    };

    activeModal.componentInstance.title = module.name;
  }

  setSortOrder(courseModules: CourseModule, idx: number ){
    return courseModules.sort_order = idx+1;
  }

  drop(event: CdkDragDrop<string[]>, courseModules) {
    event.item.data.sort_order = event.currentIndex;
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

  }


  dragStarted(event: CdkDragStart, courseModule: CourseModule) {
    this.isDragging = courseModule.id;
  }

  dragEnded(event: CdkDragEnd) {
   // this.isDragging = false;
  }

  resetDrag(){
    Notiflix.Block.Dots(`app-modules table`);
    this.dragResetSubscription = this.route.params.pipe(mergeMap(res=>{
      return this.courseService.listModules(res.courseId);
    })).subscribe(res=>{
      this.isDragging = null;
      Notiflix.Block.Remove(`app-modules table`);
    }, err=>{
      Notiflix.Block.Remove(`app-modules table`);
    });
  }


  saveSortOrder(courseModule: CourseModule){
    Notiflix.Block.Dots(`app-modules table`);
    this.reOrderSubscription = this.route.params.pipe(mergeMap(parm=>{
      return this.courseService.orderCourseModule(parm.courseId, courseModule).pipe(mergeMap(res=>{
        return this.courseService.listModules(parm.courseId);
      }))
    })).subscribe(res=>{
      this.isDragging = null;
      Notiflix.Notify.Success(`Successfully re-ordered`);
      Notiflix.Block.Remove(`app-modules table`);
    }, err=>{
      Notiflix.Notify.Failure(`sorry unexpected error occur. Please try again later`);
      Notiflix.Block.Remove(`app-modules table`);
    });
  }


  editModule(module:CourseModule=null){
    this.courseModule = module;
  }
  deleteCourseModule(module:CourseModule){
    Notiflix.Block.Merge({svgSize:'20px',});
    Notiflix.Block.Dots(`.del-${module.id}`);
    Notiflix.Confirm.Show('Delete', `Do you want to delete ${module.name} ?`, 'Yes', 'No', () => {
      this.deleteCouseModuleSuScr =
      this.route.params.pipe(mergeMap(res=>{
        return this.courseService.deleteModule(res.courseId, module).pipe(mergeMap(delRes=>{
          return this.courseService.listModules(res.courseId);
        }))
      })).subscribe(res=>{
          Notiflix.Block.Remove(`.del-${module.id}`);
          Notiflix.Notify.Success(`Successfully deleted ${module.name}`);
        }, error =>{
          Notiflix.Block.Remove(`.del-${module.id}`);
        });
    }, () => {
      Notiflix.Block.Remove(`.del-${module.id}`);
    } );
  }

  ngOnInit(): void {
    this.course$ = this.route.params.pipe(mergeMap(res=>{

      return this.courseService.course(res.courseId).pipe(tap(res=>{
        this.breadCrumbsService.bcs$.next([
          {
            url: '/',
            name: 'Home',
          },
          {
            url: '/teacher/courses',
            name: 'Courses',
          },
          {
            name: `${res.name} Modules `,
          }
        ]);
      }));
    }));

    this.courseModules$ = this.courseService.courseModules;
  }

  ngOnDestroy(){
    if(this.deleteCouseModuleSuScr){
      this.deleteCouseModuleSuScr.unsubscribe();
    }
  }
}
