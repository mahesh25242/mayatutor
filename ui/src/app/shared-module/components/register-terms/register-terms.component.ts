import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-register-terms',
  templateUrl: './register-terms.component.html',
  styleUrls: ['./register-terms.component.scss']
})
export class RegisterTermsComponent implements OnInit {

  @Input() url:string;
  @Input() title:string;
  @Input() isPromo:boolean;
  video: any = null;
  constructor(private modalService: NgbModal,
    public modal: NgbActiveModal) { }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {

    }, (reason) => {

    });
  }


  ngOnInit(): void {
    this.video =  {
      source : [
        {
          src: `${this.url}&modestbranding=1&showinfo=0&rel=0`,
          provider: 'youtube',
        },
      ]
    };
  }

}
