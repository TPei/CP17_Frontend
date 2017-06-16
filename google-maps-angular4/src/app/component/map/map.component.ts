

import { Component } from '@angular/core';
// import { styles } from "./map-styles";
import { GlobalVariables }  from './map-styles';
@Component({
  selector: 'app-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
  providers:[GlobalVariables]
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
  
  mapClicked($event: MouseEvent) {
    console.log($event);
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
		  lng: 23.815982,
		  label: 'A',
		  draggable: true
	  },
	  {
		  lat: 51.373858,
		  lng: 23.215982,
		  label: 'B',
		  draggable: false
	  },
	  {
		  lat: 12.723858,
		  lng: 25.895982,
		  label: 'C',
		  draggable: true
	  }
  ];
}
// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}