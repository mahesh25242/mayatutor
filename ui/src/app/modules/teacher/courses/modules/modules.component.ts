import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course, CourseModule } from 'src/app/lib/interfaces';
import { Observable, Subscription } from 'rxjs';
import { TeacherService } from 'src/app/lib/services';
import { mergeMap } from 'rxjs/operators';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Notiflix from "notiflix";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VideoPreviewComponent } from './add-module/video-preview/video-preview.component';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss']
})
export class ModulesComponent implements OnInit, OnDestroy {
  faEdit = faEdit;
  faTrash = faTrash;

  courseModule: CourseModule=null;

  course$: Observable<Course>;
  courseModules$: Observable<CourseModule[]>;
  deleteCouseModuleSuScr: Subscription;

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

  editModule(module:CourseModule=null){
    this.courseModule = module;
  }
  deleteCourseModule(module:CourseModule){
    Notiflix.Block.Merge({svgSize:'20px',});
    Notiflix.Block.Dots(`.del-${module.id}`);
    Notiflix.Confirm.Show('Delete', `Do you want to delete ${module.name} ?`, 'Yes', 'No', () => {
      this.deleteCouseModuleSuScr =
      this.route.params.pipe(mergeMap(res=>{
        return this.teacherService.deleteModule(res.id, module).pipe(mergeMap(delRes=>{
          return this.teacherService.listModules();
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
