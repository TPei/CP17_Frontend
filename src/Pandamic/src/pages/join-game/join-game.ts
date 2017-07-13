import { Component } from '@angular/core';
import { NavController,ToastController,NavParams } from 'ionic-angular';
import { GamePage } from '../game/game';
import {Game_Constants} from '../../providers/Game_Constants/gameconstants';

@Component({
  selector: 'page-join-game',
  templateUrl: 'join-game.html'
})



export class JoinGamePage {

  game_data :any ='';
  game_id : any = [];
  
  constructor(public navCtrl: NavController , public navParams : NavParams ,   public toastCtrl: ToastController,) {
  }

  goToGame(params){
    if(this.game_data.inProgress || Game_Constants.APP_FORCE_START){
          if (!params) params = {};
          this.navCtrl.push(GamePage ,this.game_data);
    }else{
      this.showToastMessage("This is Game is Finished");
    }
  }

  ionViewDidLoad(){
    this.game_data= this.navParams.get('game');
    this.game_id = this.game_data.game_id;
  }


  showToastMessage(info : string) {
    let toast = this.toastCtrl.create({
      message: info,
      duration: 3000
    });
    toast.present();
  }
}
