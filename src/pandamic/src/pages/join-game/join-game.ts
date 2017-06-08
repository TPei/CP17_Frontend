import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GamePage } from '../game/game';

@Component({
  selector: 'page-join-game',
  templateUrl: 'join-game.html'
})
export class JoinGamePage {

  constructor(public navCtrl: NavController) {
  }
  goToGame(params){
    if (!params) params = {};
    this.navCtrl.push(GamePage);
  }
}
