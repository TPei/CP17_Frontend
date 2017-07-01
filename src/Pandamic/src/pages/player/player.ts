import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-player',
  templateUrl: 'player.html'
})
export class PlayerPage {

  game_rule_data : any = ''; 

  constructor(public navCtrl: NavController , public navParams : NavParams) {
  }
  

  ionViewDidLoad(){
    this.game_rule_data= this.navParams.get('game_rules');
    console.log("game rul data :"+JSON.stringify(this.game_rule_data));
  }
}
