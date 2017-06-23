// import {IONIC_DIRECTIVES} from 'ionic-angular';
import { Component } from '@angular/core';
// import { styles } from "./map-styles";
import { GlobalVariables }  from './map-styles';
@Component({
  selector: 'app-map',
  templateUrl: 'map.component.html',
  // styleUrls: ['map.component.css'],
  providers:[GlobalVariables],
  // directives: []
})
export class MapComponent {

  constructor(private globalVariables:GlobalVariables){
      this.styles = globalVariables.styles;
  }

  title: string = 'My first AGM project';
  // lat: number = 51.678418;
  // lng: number = 7.809007;
  styles:any;
    


// }
  // google maps zoom level
  zoom: number = 8;
  
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;
  
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: MouseEvent,i:number) {
    console.log($event);
    console.log(i);
    // this.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng,
    //   draggable:true
    // });
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  
  markers: marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.415982,
		  label: 'A',
		  draggable: true,
      iconUrl:"http://icons.iconarchive.com/icons/icons-land/vista-map-markers/64/Map-Marker-Ball-Pink-icon.png"
	  },
	  {
		  lat: 51.373858,
		  lng: 7.214382,
		  label: 'B',
		  draggable: false,
      iconUrl:"http://icons.iconarchive.com/icons/icons-land/vista-map-markers/64/Map-Marker-Ball-Pink-icon.png"
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'C',
		  draggable: true,
      iconUrl:"http://icons.iconarchive.com/icons/icons-land/vista-map-markers/64/Map-Marker-Ball-Pink-icon.png"
	  }
  ];
}
// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
  iconUrl:string;
}