import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MailService } from '../services/mail.service';
import Notiflix from "notiflix";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit {
  @Input() reply:boolean;
  composeFrm:FormGroup;
  constructor(private formBuilder: FormBuilder,
    private mailService: MailService,
    private router: Router,
    private route:ActivatedRoute) { }

  sentMessage(){
    Notiflix.Loading.Pulse(`Sending...`);
    const postData ={
      recipients: this.f.recipients.value,
      subject: this.f.subject.value,
      message: this.f.message.value,
    }
    this.mailService.send(postData).subscribe(res=>{
      Notiflix.Loading.Remove();
      Notiflix.Notify.Success(`successfully sent message`);
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

  ngOnInit(): void {
    this.composeFrm = this.formBuilder.group({
      recipients: [null, [ Validators.required]],
      subject: [null, [ Validators.required]],
      message: [null, [ Validators.required]],
    });
  }

}
