import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController ,NavParams } from 'ionic-angular';
//import { Geolocation } from '@ionic-native/geolocation';
 
declare var google;

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})

export class GamePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  local: any;
  game_data :any ='';
  locations :any = [];


  constructor(public navCtrl: NavController , public navParams : NavParams) {
  }

  ionViewDidLoad(){
    this.game_data= this.navParams.get('map');
    this.locations = this.game_data.locations;
    this.loadMap();
    this.addMarkers();
    
  }
//Add the markers in the google map
  addMarkers(){
    for (var _i = 0; _i < this.locations.length; _i++) {
    this.addMarker(this.locations[_i].latitude,
      this.locations[_i].longitude ,
      this.locations[_i].alias,
      this.locations[_i].color, 
      this.locations[_i].research_building,
      this.locations[_i].cubes);
    }
  }
 
   //Load the map and initialized with a mid value
  loadMap(){

   //location 6 has to be changed to Mid count of location length
    let latLng = new google.maps.LatLng(this.locations[6].latitude,
                                        this.locations[6].longitude);
    let mapOptions = {
      center: latLng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
  }

  addMarker(lattitue :number , lognitute: number , alias:string , color: string , research_building: boolean , cube_info : string){
  let image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';   
  let image1 = 'http://yakimono.yunotsu.org/images/pin-small.png';
  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: new google.maps.LatLng(lattitue,lognitute),
    icon: image
  });
  
  let _alias = alias; 
  
  if(research_building){
     new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(lattitue,lognitute),
      icon: image1
    });
  }    
  this.addController(marker, _alias , color ,cube_info);
  }

//Add control and cube informations 
  addController(marker, content , color , cube_info){
  //  console.log("cube data : "+ JSON.stringify(cube_info));
      let infoWindow = new google.maps.InfoWindow({
        content: 'this is : '+content +'\n'+ 'color is : '+color
      });

      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
      });
  }

  add_Research_Controller(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
 }
}

