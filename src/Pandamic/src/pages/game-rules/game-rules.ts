import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddPlayerPage } from '../add-player/add-player';
import { GamePage } from '../game/game';
import { JoinGamePage } from '../join-game/join-game';


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

  constructor(public navCtrl: NavController , public navParams : NavParams) {
  }
  

  ionViewDidLoad(){
    this.game_rule_data= this.navParams.get('game_rules');
    this.max_action_count = this.game_rule_data.max_action_count;
    this.cureAmount = this.game_rule_data.cureAmount;
    this.locationProximity = this.game_rule_data.locationProximity;
    this.outbreak_max_lvl = this.game_rule_data.outbreak_max_lvl;
    this.research_building_count = this.game_rule_data.research_building_count;
    this.infection_lvl = this.game_rule_data.infection_lvl;
  }
}
