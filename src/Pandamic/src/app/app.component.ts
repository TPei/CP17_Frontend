import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MainMenuPage } from '../pages/main-menu/main-menu';
import { GameRulesPage } from '../pages/game-rules/game-rules';
import { DiseasesPage } from '../pages/diseases/diseases';
import { IndicatorsPage } from '../pages/indicators/indicators';
import { PlayerPage } from '../pages/player/player';
import { RestApiProvider } from '../providers/rest-api/rest-api';
import { PandemicChat } from '../pages/pandemic-chat/pandemic-chat';
import { Platform, Nav, AlertController, ModalController} from 'ionic-angular';
import { LocalstorageProvider } from '../providers/localstorage/localstorage';
import * as firebase from 'firebase';



@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = MainMenuPage;

  jsonReult : any = '';
  game_id : any = '';
  user_id : any = '';

   constructor( platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private restApiProvider : RestApiProvider, private alertCtrl: AlertController,public modalCtrl : ModalController, private localStr: LocalstorageProvider) {
      let config = {
            apiKey: "AIzaSyDkCp6_HnPP8bNf3RRM_7tGiuKgK7CwCzI",
            authDomain: "pandemicchat.firebaseapp.com",
            databaseURL: "https://pandemicchat.firebaseio.com",
            projectId: "pandemicchat",
            storageBucket: "pandemicchat.appspot.com",
            messagingSenderId: "113108546747"
        };
        firebase.initializeApp(config);

      platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.game_get_data();
  }

   initiateChat(){
        this.modalCtrl.create(PandemicChat).present();
    }

  game_get_data(){
    this.restApiProvider.get_game_data("1").then((result)=> {
      this.jsonReult = result;
      this.game_id = this.jsonReult.game.game_id;
      this.user_id = this.localStr.get_data("player_id1");
      localStorage['game_id']=this.game_id;
      localStorage['user_id']=this.user_id;
      console.log("game id is: "+this.game_id + " and you are: "+this.user_id);
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

  onClick1(params){
    if (!params) params = {};
       this.popPrompt();
  }

  onClick2(params){
    if (!params) params = {};
       this.popPrompt();
  }

  onClick3(params){
    if (!params) params = {};
       this.popPrompt();
  }

  onClick4(params){
    if (!params) params = {};
    this.popPrompt();
  }

   popPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Actions',
      buttons: [
        
        {
          text: 'Cure',
          handler: data => {
          }
        },
      ]
    });
    alert.present();
  }


}
