import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

import {NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent';


import { httpInterceptorProviders } from './lib/interceptor'
import {  SharedModuleModule } from './shared-module/shared-module.module';
import {  PlayerModuleModule } from './shared-module/player-module.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './lay-out/header/header.component';
import { AdminHeaderComponent } from './lay-out/header/admin-header/admin-header.component';

import { FooterComponent } from './lay-out/footer/footer.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ForgotPasswordComponent } from './sign-in/forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { DashBoardResolver } from './modules/teacher/dash-board/dash-board-resolver';
import { LayOutComponent } from './lay-out/lay-out.component';
import { SetNewPasswordComponent } from './set-new-password/set-new-password.component';
import { UserActivationComponent } from './user-activation/user-activation.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { CookiesPolicyComponent } from './cookies-policy/cookies-policy.component';
import { HomeBannerComponent } from './home/home-banner/home-banner.component';
import { HomeMiddleComponent } from './home/home-middle/home-middle.component';
import { PurchaseLandingComponent } from './purchase-landing/purchase-landing.component';
import { RefundAndCancelationComponent } from './refund-and-cancelation/refund-and-cancelation.component';

var config = {
  apiKey: "AIzaSyAhzEi15mQe-KY7rhbmIi8MnvL2-KcL7uw",
  authDomain: "mayatutor-6bf6d.firebaseapp.com",
  databaseURL: "https://mayatutor-f5748.firebaseio.com",
  projectId: "mayatutor-6bf6d",
  storageBucket: "mayatutor-6bf6d.appspot.com",
  messagingSenderId: "717157472041",
  appId: "1:717157472041:web:ffedb70bff29fcd9390938",
  measurementId: "G-JQHPN5ELGR"
};

const cookieConfig:NgcCookieConsentConfig = {

  cookie: {
    domain: 'localhost' // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#f1d600'
    }
  },
  position:'bottom-left',
  theme: 'edgeless',
  type: 'opt-out',
   content: {
     message: `We need your consent to set cookies on your device. To agree, click "Allow cookies".<b>Please allow browser cookie for video playing.</b>`,
  //   dismiss: `this.cookieDismiss`,
  //   link: `this.cookieLinkText`,
     href:  "/cookies-policy"
   }
};



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminHeaderComponent,
    FooterComponent,
    SignInComponent,
    ForgotPasswordComponent,
    HomeComponent,
    AboutUsComponent,
    HowItWorksComponent,
    ContactUsComponent,
    PageNotFoundComponent,
    LayOutComponent,
    SetNewPasswordComponent,
    UserActivationComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    CookiesPolicyComponent,
    HomeBannerComponent,
    HomeMiddleComponent,
    PurchaseLandingComponent,
    RefundAndCancelationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModuleModule,
    PlayerModuleModule,
    HttpClientModule,
    HttpClientXsrfModule.disable(),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgcCookieConsentModule.forRoot(cookieConfig)
  ],
  providers: [
    httpInterceptorProviders,
    DashBoardResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
