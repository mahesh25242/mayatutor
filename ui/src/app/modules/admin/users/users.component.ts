import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { empty, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { User } from 'src/app/lib/interfaces';
import { UserService } from 'src/app/lib/services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  pageData$: Observable<{
    pageTitle: string,
    data: User[]
  }>;
  constructor(private route:ActivatedRoute,
    private userService: UserService) { }

  ngOnInit(): void {
     this.pageData$ = this.route.data.pipe(mergeMap(res=>{
       let pageTitle: string = '';
      switch(res.type){
        case 'teacher':
          pageTitle = 'Teachers';
        break;
        case 'student':
          pageTitle = 'Students';
        break;
      }

      return this.userService.getAllUser(`admin/${res.type}`).pipe(map(users =>{
        return {
          pageTitle: pageTitle,
          data: users
        }
      }));
     }));
  }

}
