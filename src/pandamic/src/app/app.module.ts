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
import { GameRulesPage } from '../pages/game-rules/game-rules';
import { DiseasesPage } from '../pages/diseases/diseases';
import { IndicatorsPage } from '../pages/indicators/indicators';
import { PlayerPage } from '../pages/player/player';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestApiProvider } from '../providers/rest-api/rest-api';

import { MapComponent } from './component/map/map.component';
// import { AgmCoreModule } from '@agm/core';

import { HttpModule } from '@angular/http';


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
    GameRulesPage,
    DiseasesPage,
    IndicatorsPage,
    PlayerPage
  ],
  imports: [
    BrowserModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyB3iOKgL5F3C5luaBh5Hhbj1pa2TCJqIhw'
    // }),
    HttpModule,
    IonicModule.forRoot(MyApp)
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
    GameRulesPage,
    DiseasesPage,
    IndicatorsPage,
    PlayerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestApiProvider
  ]
})
export class AppModule {}