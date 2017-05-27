import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GamePage } from '../game/game';

@Component({
  selector: 'page-add-player',
  templateUrl: 'add-player.html'
})
export class AddPlayerPage {

  constructor(public navCtrl: NavController) {
  }
  goToGame(params){
    if (!params) params = {};
    this.navCtrl.push(GamePage);
  }
}
