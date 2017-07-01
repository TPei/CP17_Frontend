import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddPlayerPage } from '../add-player/add-player';
import { GamePage } from '../game/game';
import { JoinGamePage } from '../join-game/join-game';


@Component({
  selector: 'page-game-rules',
  templateUrl: 'game-rules.html'
})
export class GameRulesPage {

  game_rule_data : any = ''; 

  constructor(public navCtrl: NavController , public navParams : NavParams) {
  }
  

  ionViewDidLoad(){
    this.game_rule_data= this.navParams.get('game_rules');
    console.log("game rul data :"+JSON.stringify(this.game_rule_data));
  }
}
