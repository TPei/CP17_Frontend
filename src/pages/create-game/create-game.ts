import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddPlayerPage } from '../add-player/add-player';
import { GamePage } from '../game/game';
import { JoinGamePage } from '../join-game/join-game';


@Component({
  selector: 'page-create-game',
  templateUrl: 'create-game.html'
})
export class CreateGamePage {

  constructor(public navCtrl: NavController) {
  }
  goToAddPlayer(params){
    if (!params) params = {};
    this.navCtrl.push(AddPlayerPage);
  }goToGame(params){
    if (!params) params = {};
    this.navCtrl.push(GamePage);
  }goToJoinGame(params){
    if (!params) params = {};
    this.navCtrl.push(JoinGamePage);
  }
}
