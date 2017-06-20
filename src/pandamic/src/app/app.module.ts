import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { GamePage } from '../pages/game/game';
import { MainMenuPage } from '../pages/main-menu/main-menu';
import { RuleBookPage } from '../pages/rule-book/rule-book';
import { OptionsPage } from '../pages/options/options';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { CreateGamePage } from '../pages/create-game/create-game';
import { AddPlayerPage } from '../pages/add-player/add-player';
import { JoinGamePage } from '../pages/join-game/join-game';
//import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule, JsonpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    GamePage,
    MainMenuPage,
    RuleBookPage,
    OptionsPage,
    LoginPage,
    SignUpPage,
    CreateGamePage,
    AddPlayerPage,
    JoinGamePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    JsonpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GamePage,
    MainMenuPage,
    RuleBookPage,
    OptionsPage,
    LoginPage,
    SignUpPage,
    CreateGamePage,
    AddPlayerPage,
    JoinGamePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}