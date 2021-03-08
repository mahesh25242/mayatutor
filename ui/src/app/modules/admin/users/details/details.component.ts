import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/lib/interfaces';
import { UserService, TeacherService } from 'src/app/lib/services';
import Notiflix from "notiflix";
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  @Input() user: User;
  user$: Observable<User>;
  @Output() public loadUser = new EventEmitter();

  deletUserSubScr: Subscription;
  resentActivationMailSubScr: Subscription;
  constructor(private userService: UserService,
    public modal: NgbActiveModal,
    private teacherService: TeacherService,) { }


    deleteUser(): void{
      Notiflix.Block.Merge({svgSize:'20px',});
      Notiflix.Block.Dots(`.delete-user`);

      Notiflix.Confirm.Show('Delete?', "Are you sure you want to delete?", 'Yes', 'No', () => {
        this.deletUserSubScr = this.userService.deleteUser(`admin/${this.user.role_url}`, this.user).subscribe(res=>{
        Notiflix.Block.Remove(`.delete-user`);
        Notiflix.Notify.Success(res.message);
        this.loadUser.emit();
      }, err=>{
        Notiflix.Block.Remove(`.delete-user`);
      });

      }, () => {
        Notiflix.Block.Remove(`.delete-user`);
      } )


    }

    toggleAutoApproval(): void{
      Notiflix.Block.Merge({svgSize:'20px',});
      Notiflix.Block.Dots(`.auto-approval`);

      this.deletUserSubScr = this.teacherService.toggleAutoApproval(this.user).subscribe(res=>{
        Notiflix.Block.Remove(`.auto-approval`);
        Notiflix.Notify.Success(res.message);
      }, err=>{
        Notiflix.Block.Remove(`.auto-approval`);
      });


    }

    resetActivationMail(){

      Notiflix.Block.Merge({svgSize:'20px',});
      Notiflix.Block.Dots(`.resent-mail`);

      Notiflix.Confirm.Show('Delete?', "Are you sure you want to delete?", 'Yes', 'No', () => {
        this.resentActivationMailSubScr = this.userService.resentActivationMail(this.user)
        .subscribe(res=>{
          Notiflix.Block.Remove(`.resent-mail`);
          Notiflix.Notify.Success(`successfully resnt activation mail`);
        }, error=>{
          Notiflix.Block.Remove(`.resent-mail`);
          Notiflix.Notify.Failure(`Sorry unexpected error occur`);
        });

      }, () => {
        Notiflix.Block.Remove(`.resent-mail`);
      } )


    }

  ngOnInit(): void {
    this.user$ = this.userService.getUser(`${this.user.id}`, `admin/${this.user.role_url}`).pipe(map(res=>{
      this.user.teacher_auto_approval_count = res?.teacher_auto_approval_count;
      return res;
    }));
  }

  ngOnDestroy(){
    this.resentActivationMailSubScr && this.resentActivationMailSubScr.unsubscribe()
    this.deletUserSubScr && this.deletUserSubScr.unsubscribe()
  }

}
