import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-diseases',
  templateUrl: 'diseases.html'
})
export class DiseasesPage {

  diseases : any = ''; 

  constructor(public navCtrl: NavController , public navParams : NavParams) {
  }
  

  ionViewDidLoad(){
    this.diseases= this.navParams.get('diseases');
  }
}
