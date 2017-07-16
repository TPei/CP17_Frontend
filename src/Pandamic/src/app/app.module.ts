import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { GamePage } from '../pages/game/game';
import { PandemicChat } from '../pages/pandemic-chat/pandemic-chat';
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
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
import { Device } from '@ionic-native/device';

// import { MapComponent } from './component/map/map.component';
// import { AgmCoreModule } from '@agm/core';

import { HttpModule } from '@angular/http';
import { LocalstorageProvider } from '../providers/localstorage/localstorage';

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
    PlayerPage,
    PandemicChat
  ],
  imports: [
    BrowserModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyB3iOKgL5F3C5luaBh5Hhbj1pa2TCJqIhw'
    // }),
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
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
    PlayerPage,
    PandemicChat
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Device,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestApiProvider,
    LocalstorageProvider
  ]
})
export class AppModule {}