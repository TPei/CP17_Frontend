import { NgModule, ErrorHandler,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule, JsonpModule } from '@angular/http';
import { RestApiProvider } from '../providers/rest-api/rest-api';
import { MapComponent } from './component/map/map.component';
import { AgmCoreModule } from '@agm/core';


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
    JoinGamePage,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB3iOKgL5F3C5luaBh5Hhbj1pa2TCJqIhw'
    }),
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
    JoinGamePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestApiProvider
  ],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}