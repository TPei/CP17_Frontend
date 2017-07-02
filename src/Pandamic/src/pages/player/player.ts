import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-player',
  templateUrl: 'player.html'
})
export class PlayerPage {

  player_data : any = ''; 
  tokens : any= '';

  constructor(public navCtrl: NavController , public navParams : NavParams) {
  }
  

  ionViewDidLoad(){
    this.player_data= this.navParams.get('player');
    this.tokens= this.player_data.tokens;
  }
}
