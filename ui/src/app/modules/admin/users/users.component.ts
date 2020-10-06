import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, empty, Observable, of, Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { User } from 'src/app/lib/interfaces';
import { UserService } from 'src/app/lib/services';
import Notiflix from "notiflix";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsComponent } from './details/details.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  pageTitle: string;
  type: string;
  users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);

  toggleStstuSubScr: Subscription;
  delRefreshUserSubScr: Subscription;
  constructor(private route:ActivatedRoute,
    private userService: UserService,
    private _modalService: NgbModal,) { }

  get usersObs(){
    return this.users$.asObservable();
  }

  toggleStatus(user: User){
    Notiflix.Block.Merge({svgSize:'20px',});
    Notiflix.Block.Dots(`.toggle-status-${user.id}`);

    Notiflix.Confirm.Show('Change Status?', "Are you sure you want to change status?", 'Yes', 'No', () => {
      this.toggleStstuSubScr = this.userService.toggleStatus(`admin/${this.type}`, user).pipe(mergeMap(res=>{
        return this.userService.getAllUser(`admin/${this.type}`).pipe(map(users =>{
          this.users$.next(users);
          return res;
        }));
    })).subscribe(res=>{
      Notiflix.Block.Remove(`.toggle-status-${user.id}`);
      Notiflix.Notify.Success(res.message);
    }, err=>{
      Notiflix.Block.Remove(`.toggle-status-${user.id}`);
    });

    }, () => {
      Notiflix.Block.Remove(`.toggle-status-${user.id}`);
    } )
  }

  deleteUser(user: User){
    Notiflix.Block.Merge({svgSize:'20px',});
    Notiflix.Block.Dots(`.delete-user-${user.id}`);

    Notiflix.Confirm.Show('Delete?', "Are you sure you want to delete?", 'Yes', 'No', () => {
      this.toggleStstuSubScr = this.userService.deleteUser(`admin/${this.type}`, user).pipe(mergeMap(res=>{
        return this.userService.getAllUser(`admin/${this.type}`).pipe(map(users =>{
          this.users$.next(users);
          return res;
        }));
    })).subscribe(res=>{
      Notiflix.Block.Remove(`.delete-user-${user.id}`);
      Notiflix.Notify.Success(res.message);
    }, err=>{
      Notiflix.Block.Remove(`.delete-user-${user.id}`);
    });

    }, () => {
      Notiflix.Block.Remove(`.delete-user-${user.id}`);
    } )


  }

  details(user:User=null){
    const activeModal = this._modalService.open(DetailsComponent,{ size: 'lg'});

    user.role_url = this.type;
    activeModal.componentInstance.user = user;

    this.delRefreshUserSubScr = activeModal.componentInstance.loadUser.pipe(mergeMap(res =>{
      return this.userService.getAllUser(`admin/${this.type}`).pipe(map(users=>{
        this.users$.next(users);
        return users;
      }))
    })).subscribe(res=>{
      activeModal.close();
    });


  }

  ngOnInit(): void {
    this.pageTitle = this.route.snapshot.data['users']?.pageTitle;
    this.type = this.route.snapshot.data['users']?.type;
    this.users$.next(this.route.snapshot.data['users']?.data);
  }

  ngOnDestroy(){
    if(this.toggleStstuSubScr){
      this.toggleStstuSubScr.unsubscribe();
    }

    if(this.delRefreshUserSubScr){
      this.delRefreshUserSubScr.unsubscribe();
    }
  }
}
