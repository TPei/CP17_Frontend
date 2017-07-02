import { Component, ViewChild, ElementRef } from '@angular/core';
// import { NavController } from 'ionic-angular';
//import { Geolocation } from '@ionic-native/geolocation';
// import { MapComponent } from '../../app/component/map/map.component';
import { GlobalVariables }  from './map-styles';
import { GameService } from '../../services/game.service';
declare var google;

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
  providers:[GlobalVariables,GameService],
})
export class GamePage {
  map: any;
  @ViewChild('map') mapElement: ElementRef;

  styles:any;

  // constructor(
  // public navCtrl: NavController,
  // private globalVariables:GlobalVariables,
  // private gameService : GameService) {

  //   this.styles = globalVariables.styles;
  // }


    // title: string = 'My first AGM project';
  // lat: number = 51.678418;
  // lng: number = 7.809007;
  
    


// }
  // google maps zoom level
  minZoom: number = 10;
  maxZoom: number = 15;
  
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;
  
  // clickedMarker(label: string, index: number) {
  //   console.log(`clicked the marker: ${label || index}`)
  // }
  
  // mapClicked($event: MouseEvent,i:number) {
  //   console.log($event);
  //   console.log(i);
  //   console.log('map clicked');
  //   // this.markers.push({
  //   //   lat: $event.coords.lat,
  //   //   lng: $event.coords.lng,
  //   //   draggable:true
  //   // });
  // }
  
  // markerDragEnd(m: marker, $event: MouseEvent) {
  //   console.log('dragEnd', m, $event);
  // }
  
  // markers: marker[] = [
	//   {
	// 	  lat: 51.673858,
	// 	  lng: 7.415982,
	// 	  label: 'A',
	// 	  draggable: true,
  //     iconUrl:"http://icons.iconarchive.com/icons/icons-land/vista-map-markers/64/Map-Marker-Ball-Pink-icon.png"
	//   },
	//   {
	// 	  lat: 51.373858,
	// 	  lng: 7.214382,
	// 	  label: 'B',
	// 	  draggable: false,
  //     iconUrl:"http://icons.iconarchive.com/icons/icons-land/vista-map-markers/64/Map-Marker-Ball-Pink-icon.png"
	//   },
	//   {
	// 	  lat: 51.723858,
	// 	  lng: 7.895982,
	// 	  label: 'C',
	// 	  draggable: true,
  //     iconUrl:"http://icons.iconarchive.com/icons/icons-land/vista-map-markers/64/Map-Marker-Ball-Pink-icon.png"
	//   }
  // ];



  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    let latLng = new google.maps.LatLng(-34.9290, 138.6010);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }

  addMarker() {
    let image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
      icon: image
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }
}
// just an interface for type safety.
// interface marker {
// 	lat: number;
// 	lng: number;
// 	label?: string;
// 	draggable: boolean;
//   iconUrl:string;
// }