import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { httpInterceptorProviders } from './interceptor'
import {  SharedModuleModule } from './shared-module/shared-module.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignInComponent } from './sign-in/sign-in.component';

var config = {
  apiKey: "AIzaSyBbf4J9nchYp2WSNePGZcRoYOUCYdCUiI0",
  authDomain: "mayatutor-f5748.firebaseapp.com",
  databaseURL: "https://mayatutor-f5748.firebaseio.com",
  projectId: "mayatutor-f5748",
  storageBucket: "mayatutor-f5748.appspot.com",
  messagingSenderId: "552545840820"
};



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    SharedModuleModule,
    HttpClientModule,
    HttpClientXsrfModule.disable(),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
