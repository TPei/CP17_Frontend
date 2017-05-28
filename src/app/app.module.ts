import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { RouterModule, Routes } from '@angular/router';
// import { AppRoutingModule } from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from './component/signup/signup.component';
import { RuleBookComponent } from './component/rule-book/rule-book.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingPageComponent,
    SignupComponent,
    RuleBookComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'signup',
        component:SignupComponent
      },
      {
        path:'rulebook',
        component:RuleBookComponent
      },
      {
        path:'start',
        component:LandingPageComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
