import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';

@Component({
  selector: 'page-indicators',
  templateUrl: 'indicators.html'
})
export class IndicatorsPage {

  game_rule_data : any = ''; 
  outbreak_marker : any = '';
  infection_rate : any = '';
  action_count : any = '';

  constructor(public navCtrl: NavController , public navParams : NavParams ,private restApi:RestApiProvider) {
  }
  

  ionViewDidLoad(){
    this.loadData();
  }

  loadData(){
    this.restApi.get_game_data("1").then((result)=> {
      let game: any = result['game'];
      this.game_rule_data= game.indicators;
      this.outbreak_marker = this.game_rule_data.outbreak_marker;
      this.infection_rate = this.game_rule_data.infection_rate;
      this.action_count = this.game_rule_data.action_count;
       }, (err) => {
       console.log("data failed 1");
    });
  }
}
