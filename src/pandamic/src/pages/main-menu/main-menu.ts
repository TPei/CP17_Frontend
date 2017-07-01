import { Component } from '@angular/core';
import { NavController, ToastController ,AlertController } from 'ionic-angular';
import { RuleBookPage } from '../rule-book/rule-book';
import { OptionsPage } from '../options/options';
import { LoginPage } from '../login/login';
import { SignUpPage } from '../sign-up/sign-up';
import { CreateGamePage } from '../create-game/create-game';
import { AddPlayerPage } from '../add-player/add-player';
import { GamePage } from '../game/game';
import { JoinGamePage } from '../join-game/join-game';
import { RestApiProvider } from '../../providers/rest-api/rest-api';


@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html'
})
export class MainMenuPage {

  json_data : any ='';

  constructor(public navCtrl: NavController ,
   public restApiProvider : RestApiProvider ,
   public toastCtrl: ToastController,
   private alertCtrl: AlertController) {
    this.game_get_data();
  }

  game_get_data(){
    this.restApiProvider.get_game_data().then((result)=> {
      this.json_data = result;
      console.log("data revicied"+JSON.stringify(result));
    }, (err) => {
       console.log("data failed 1");
    });
  }

   showToastMessage(info : string) {
    let toast = this.toastCtrl.create({
      message: info,
      duration: 3000
    });
    toast.present();
  }

 showAlert() {
  let alert = this.alertCtrl.create({
    title: 'Low battery',
    subTitle: '10% of battery remaining',
    buttons: ['Dismiss']
  });
  alert.present();
}



  goToRuleBook(params){
    if (!params) params = {};
    this.navCtrl.push(RuleBookPage);
  }goToOptions(params){
    if (!params) params = {};
    this.navCtrl.push(OptionsPage);
  }goToLogin(params){
    if (!params) params = {};
   // this.navCtrl.push(LoginPage);
    //  this.showToastMessage('Data is Not Availble Either check or internet or Server is not working');
   //this.showAlert();
  this.navCtrl.push(JoinGamePage, this.json_data);
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
