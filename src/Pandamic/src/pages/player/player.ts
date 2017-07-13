import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { Game_Constants } from '../../providers/Game_Constants/gameconstants';

@Component({
  selector: 'page-player',
  templateUrl: 'player.html'
})
export class PlayerPage {

  player_data : any = ''; 
  tokens : any= '';

  constructor(public navCtrl: NavController , public navParams : NavParams,private restApi:RestApiProvider) {
  }
  

  ionViewDidLoad(){
    this.loadData();
  }

  loadData(){
    this.restApi.get_game_data(Game_Constants.DEFAULT_GAME_ID).then((result)=> {
      this.player_data= this.navParams.get('player');
      this.tokens= this.player_data.tokens;
       }, (err) => {
       console.log("data failed 1");
    });
  }
}
