import { Component, OnInit, Input } from '@angular/core';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-help-video',
  templateUrl: './help-video.component.html',
  styleUrls: ['./help-video.component.scss']
})
export class HelpVideoComponent implements OnInit {
  faYoutube = faYoutube;
  @Input() url:string;
  @Input() title:string;
  @Input() isPromo:boolean;
  video: any = null;
  constructor(private modalService: NgbModal) { }

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
