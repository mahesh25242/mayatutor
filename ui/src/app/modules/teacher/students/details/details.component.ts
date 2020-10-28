import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/lib/interfaces';
import { UserService, TeacherService, StudentService } from 'src/app/lib/services';
import Notiflix from "notiflix";
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() user: User;
  user$: Observable<User>;
  @Output() public loadUser = new EventEmitter();

  deletUserSubScr: Subscription;
  constructor(private userService: UserService,
    public modal: NgbActiveModal,
    private teacherService: TeacherService,
    private studentService: StudentService) { }


    deleteUser(): void{
      Notiflix.Block.Merge({svgSize:'20px',});
      Notiflix.Block.Dots(`.delete-user`);

      Notiflix.Confirm.Show('Delete?', "Are you sure you want to delete?", 'Yes', 'No', () => {
        this.deletUserSubScr = this.studentService.deleteStudent(this.user.student).subscribe(res=>{
        Notiflix.Block.Remove(`.delete-user`);
        Notiflix.Notify.Success('successfully deleted');
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

  ngOnInit(): void {

  }

}
