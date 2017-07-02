import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MainMenuPage } from '../pages/main-menu/main-menu';
import { GameRulesPage } from '../pages/game-rules/game-rules';
import { DiseasesPage } from '../pages/diseases/diseases';
import { IndicatorsPage } from '../pages/indicators/indicators';
import { PlayerPage } from '../pages/player/player';
import { RestApiProvider } from '../providers/rest-api/rest-api';




@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = MainMenuPage;

  jsonReult : any = '';
  game_id : any = '';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen ,private restApiProvider : RestApiProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.game_get_data();
  }

  game_get_data(){
    this.restApiProvider.get_game_data().then((result)=> {
      this.jsonReult = result;
      this.game_id = this.jsonReult.game.game_id;
      console.log("game id is :"+this.game_id);

      
    }, (err) => {
       console.log("data failed 1");
    });
  }

   gotogamerules(params){
    if (!params) params = {};
    this.navCtrl.push(GameRulesPage ,this.jsonReult.game);
  }

   Diseases(params){
    if (!params) params = {};
    this.navCtrl.push(DiseasesPage ,this.jsonReult.game);
  }

   Indicators(params){
    if (!params) params = {};
    this.navCtrl.push(IndicatorsPage ,this.jsonReult.game);
  }

   Player(params){
    if (!params) params = {};
    this.navCtrl.push(PlayerPage ,this.jsonReult.game);
  }

}
