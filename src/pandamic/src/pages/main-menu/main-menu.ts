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
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { GameService } from '../../services/game.service';


@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
  providers:[GameService]
})
export class MainMenuPage {

  constructor(public navCtrl: NavController , public restApiProvider : RestApiProvider, private gameService : GameService) {
  }

  game_get_data(){
    this.restApiProvider.get_game_data().then((result)=> {
      console.log("data revicied"+JSON.stringify(result));
    }, (err) => {
       console.log("data failed 1");
    });
  }

  goToRuleBook(params){
    if (!params) params = {};
    this.navCtrl.push(RuleBookPage);
  }goToOptions(params){
    if (!params) params = {};
    this.navCtrl.push(OptionsPage);
  }goToLogin(params){
    if (!params) params = {};

     console.log( this.gameService.gameRequest());

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
