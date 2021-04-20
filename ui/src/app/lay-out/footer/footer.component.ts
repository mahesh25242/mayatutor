import { Component, OnInit } from '@angular/core';
import { faInstagram, faTwitter, faFacebook, faPinterest, faDribbble} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  
  faTwitter = faTwitter;
  faFacebook = faFacebook;
  faPinterest = faPinterest;
  faDribbble = faDribbble;
  faInstagram = faInstagram;  
  constructor() { }

  ngOnInit(): void {
  }

}
