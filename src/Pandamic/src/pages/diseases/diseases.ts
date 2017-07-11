import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';


@Component({
  selector: 'page-diseases',
  templateUrl: 'diseases.html'
})
export class DiseasesPage {

  diseases : any = ''; 

  constructor(public navCtrl: NavController , public navParams : NavParams , private restApi:RestApiProvider) {
  }
  

  ionViewDidLoad(){
    this.loadData();
  }

  loadData(){
    this.restApi.get_game_data("1").then((result)=> {
      let game: any = result['game'];
     this.diseases= game.diseases;
       }, (err) => {
       console.log("data failed 1");
    });
  }
}
