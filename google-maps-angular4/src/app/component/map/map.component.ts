

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
  lat: number = 51.678418;
  lng: number = 7.809007;
  styles:any;
    


}