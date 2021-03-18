import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {faUser,faClock } from '@fortawesome/free-solid-svg-icons';
import { User, Course, CourseModule } from 'src/app/lib/interfaces';


@Component({
  selector: 'app-module-launch',
  templateUrl: './module-launch.component.html',
  styleUrls: ['./module-launch.component.scss']
})
export class ModuleLaunchComponent implements OnInit {
  @Input() courseModule: CourseModule;

  video: any = null;
  pdfSrc: any =null;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.video = {
      source : [
        {
          src: `${this.courseModule.video_url}&modestbranding=1&showinfo=0&rel=0`,
          provider: this.courseModule.video_type,
        },
      ]
    };
    //this.courseModule.pdf = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
    //this.pdfSrc =  this.courseModule.pdf;

    if(this.courseModule.pdf)
      this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.courseModule.pdf);

  }

  onPdfError(error: any) {
    console.log(error)
  }

}
