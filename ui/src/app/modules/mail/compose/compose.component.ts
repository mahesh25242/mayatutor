import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MailService } from '../services/mail.service';
import Notiflix from "notiflix";
import { Router, ActivatedRoute } from '@angular/router';
import { User, UserWithPagination } from 'src/app/lib/interfaces';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { UserService } from 'src/app/lib/services';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit {
  @Input() reply:boolean;
  @Input() toMessage:User;
  @Input() outSideMail: boolean;
  @Output() public sent = new EventEmitter();
  composeFrm:FormGroup;
  users$: Observable<UserWithPagination>;
  userInput$ = new Subject<string>();

  peopleLoading = false;
  constructor(private formBuilder: FormBuilder,
    private mailService: MailService,
    private router: Router,
    private route:ActivatedRoute,
    private userService : UserService) { }

  sentMessage(){
    Notiflix.Loading.Pulse(`Sending...`);
    const postData ={
      recipients: this.f.recipients.value,
      subject: this.f.subject.value,
      message: this.f.message.value,
    }
    this.mailService.send(postData).subscribe(res=>{
      Notiflix.Loading.Remove();
      if(this.outSideMail){
        if(res?.m){
          Notiflix.Report.Success('',res?.m,'OK');
          this.sent.emit();
        }
      }else{
        Notiflix.Notify.Success(`successfully sent message`);
      }

      if(!this.toMessage)
        this.router.navigate(['../inbox'], {relativeTo: this.route});
    }, error=>{
      Notiflix.Loading.Remove();
      for(let result in this.composeFrm.controls){
        if(error.error.errors[result]){
          this.composeFrm.controls[result].setErrors({ error: error.error.errors[result] });
        }else{
          this.composeFrm.controls[result].setErrors(null);
        }
      }
    })
  }

  get f() { return this.composeFrm.controls; }

  trackByFn(item: User) {
      return item.id;
  }


  private loadUsers() {
      this.users$ = concat(
          of([]), // default items
          this.userInput$.pipe(
              distinctUntilChanged(),
              tap(() => this.peopleLoading = true),
              switchMap(term => this.mailService.toUser(`?q=${term}`).pipe(
                  map(res=>{
                    return res.data;
                  }),
                  catchError(() => of(null)), // empty list on error
                  tap(() => this.peopleLoading = false)
              ))
          )
      );
  }

  ngOnInit(): void {
    this.composeFrm = this.formBuilder.group({
      recipients: [ null , [ Validators.required]],
      subject: [null, [ Validators.required]],
      message: [null, [ Validators.required]],
    });

    if(this.toMessage){
      this.composeFrm.controls.recipients.setValue([this.toMessage]);
    }

    this.loadUsers();
  }

}
