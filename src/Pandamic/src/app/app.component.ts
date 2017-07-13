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
import { Platform, Nav, ModalController} from 'ionic-angular';
import { LocalstorageProvider } from '../providers/localstorage/localstorage';
import { Game_Constants } from '../providers/Game_Constants/gameconstants';
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
  player_location_data: any = '';
  Token_Data : any = '';
  default_player_name = '';
   constructor( platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private restApiProvider : RestApiProvider,public modalCtrl : ModalController, private localStr: LocalstorageProvider) {
      let config = {
            apiKey: Game_Constants.FIREBASE_API_KEY,
            authDomain: Game_Constants.FIREBASE_AUTH_URL,
            databaseURL: Game_Constants.FIREBASE_DB_URL,
            projectId: Game_Constants.FIREBASE_PROJECT_ID,
            storageBucket: Game_Constants.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: Game_Constants.FIREBASE_MESSAGE_SENDER_ID
        };
        firebase.initializeApp(config);

      platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

      if(!Game_Constants.APP_FORCE_START){
              this.localStr.get_data(Game_Constants.player_name_string).then((val) => {
               this.default_player_name = val;
                });
              }else{
                this.default_player_name = 'DefaultPlayer';
           }

    this.game_get_data();
  }

   initiateChat(){
        this.modalCtrl.create(PandemicChat).present();
    }

  game_get_data(){
    this.restApiProvider.get_game_data("1").then((result)=> {
      this.jsonReult = result;
      this.game_id = this.jsonReult.game.game_id;
      this.player_location_data = this.jsonReult.game.player;
      this.user_id = this.localStr.get_data(Game_Constants.player_name_string);
      localStorage['game_id']=this.game_id;
      localStorage['user_id']=this.user_id;
      this.TokenCount();
    }, (err) => {
       // console.log("data failed 1");
    });
  }

  TokenCount(){
      for (var _i = 0; _i < this.player_location_data.length; _i++) {
        if(this.player_location_data[_i].name == this.default_player_name ){
        for (var _k = 0; _k < this.player_location_data[_i].tokens.disease_tokens.length; _k++) {
           this.Token_Data=  this.Token_Data + " "+this.player_location_data[_i].tokens.disease_tokens[_k].color + " : "
                               + this.player_location_data[_i].tokens.disease_tokens[_k].count;
                               console.log("Coloer : "+this.player_location_data[_i].tokens.disease_tokens[_k].color );
            }
          }
        }
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
