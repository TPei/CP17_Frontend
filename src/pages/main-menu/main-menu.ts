import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RuleBookPage } from '../rule-book/rule-book';
import { OptionsPage } from '../options/options';
import { LoginPage } from '../login/login';
import { SignUpPage } from '../sign-up/sign-up';
import { CreateGamePage } from '../create-game/create-game';
import { AddPlayerPage } from '../add-player/add-player';
import { GamePage } from '../game/game';
import { JoinGamePage } from '../join-game/join-game';


@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html'
})
export class MainMenuPage {

  constructor(public navCtrl: NavController) {
  }
  goToRuleBook(params){
    if (!params) params = {};
    this.navCtrl.push(RuleBookPage);
  }goToOptions(params){
    if (!params) params = {};
    this.navCtrl.push(OptionsPage);
  }goToLogin(params){
    if (!params) params = {};
    this.navCtrl.push(LoginPage);
  }goToSignUp(params){
    if (!params) params = {};
    this.navCtrl.push(SignUpPage);
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
