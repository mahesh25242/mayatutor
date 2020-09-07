import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course, CourseModule } from 'src/app/lib/interfaces';
import { Observable, Subscription } from 'rxjs';
import { TeacherService } from 'src/app/lib/services';
import { mergeMap } from 'rxjs/operators';
import { faEdit, faTrash, faCheck, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Notiflix from "notiflix";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VideoPreviewComponent } from './add-module/video-preview/video-preview.component';
import { CdkDragStart, CdkDragEnd, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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

  isDragging:number = null;
  courseModule: CourseModule=null;

  course$: Observable<Course>;
  courseModules$: Observable<CourseModule[]>;
  deleteCouseModuleSuScr: Subscription;
  reOrderSubscription: Subscription;
  dragResetSubscription: Subscription;

  constructor(private route:ActivatedRoute,
    private teacherService: TeacherService,
    private _modalService: NgbModal) { }

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
      return this.teacherService.listModules(res.courseId);
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
      return this.teacherService.orderCourseModule(parm.courseId, courseModule).pipe(mergeMap(res=>{
        return this.teacherService.listModules(parm.courseId);
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
        return this.teacherService.deleteModule(res.courseId, module).pipe(mergeMap(delRes=>{
          return this.teacherService.listModules(res.courseId);
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
      return this.teacherService.course(res.courseId);
    }));

    this.courseModules$ = this.teacherService.courseModules;
  }

  ngOnDestroy(){
    if(this.deleteCouseModuleSuScr){
      this.deleteCouseModuleSuScr.unsubscribe();
    }
  }
}
