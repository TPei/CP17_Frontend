import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { CreateGamePage } from '../create-game/create-game';
import { AddPlayerPage } from '../add-player/add-player';
import { GamePage } from '../game/game';
import { JoinGamePage } from '../join-game/join-game';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  // provider:['GameService']
})
export class LoginPage {

  constructor(public navCtrl: NavController) {



  }
  goToSignUp(params){
    if (!params) params = {};
    this.navCtrl.push(SignUpPage);
  }goToLogin(params){
    if (!params) params = {};
    this.navCtrl.push(LoginPage);
  }goToCreateGame(params){
    if (!params) params = {};
    this.navCtrl.push(CreateGamePage);
  }goToAddPlayer(params){
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
