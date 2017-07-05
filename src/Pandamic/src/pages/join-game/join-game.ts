import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GamePage } from '../game/game';

@Component({
  selector: 'page-join-game',
  templateUrl: 'join-game.html'
})



export class JoinGamePage {

  game_data :any ='';
  game_id : any = [];
  
  constructor(public navCtrl: NavController , public navParams : NavParams) {
  }

  goToGame(params){
    if (!params) params = {};
    this.navCtrl.push(GamePage ,this.game_data);
  }

  ionViewDidLoad(){
    this.game_data= this.navParams.get('game');
    this.game_id = this.game_data.game_id;
  }
}
