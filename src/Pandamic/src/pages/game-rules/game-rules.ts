import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddPlayerPage } from '../add-player/add-player';
import { JoinGamePage } from '../join-game/join-game';
import { RestApiProvider } from '../../providers/rest-api/rest-api';


@Component({
  selector: 'page-game-rules',
  templateUrl: 'game-rules.html'
})
export class GameRulesPage {

  game_rule_data : any = ''; 
  max_action_count : any = '';
  cureAmount : any = '';
  locationProximity : any = '';
  outbreak_max_lvl : any = '';
  research_building_count : any = '';
  infection_lvl :any = '';

  constructor(public navCtrl: NavController , public navParams : NavParams , private restApi:RestApiProvider) {
  }

  loadData(){
    this.restApi.get_game_data("1").then((result)=> {
      let game: any = result['game'];
      this.game_rule_data = game.game_rules;
      this.max_action_count = this.game_rule_data.max_action_count;
      this.cureAmount = this.game_rule_data.cureAmount;
      this.locationProximity = this.game_rule_data.locationProximity;
      this.outbreak_max_lvl = this.game_rule_data.outbreak_max_lvl;
      this.research_building_count = this.game_rule_data.research_building_count;
      this.infection_lvl = this.game_rule_data.infection_lvl;
       }, (err) => {
       console.log("data failed 1");
    });
  }
  

  ionViewDidLoad(){
    this.loadData();
  }
}
