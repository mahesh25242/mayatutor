import { Component, OnInit } from '@angular/core';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import {faFacebook, faWhatsapp, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-custom-url',
  templateUrl: './custom-url.component.html',
  styleUrls: ['./custom-url.component.scss']
})
export class CustomUrlComponent implements OnInit {
  faWhatsapp = faWhatsapp;
  faFacebook  = faFacebook;
  faLinkedin  = faLinkedin;
  faTelegram  = faTelegram;
  faCopy =faCopy;

  custmUrl = 'http://localhost/as';
  constructor() { }

  ngOnInit(): void {
  }

}
