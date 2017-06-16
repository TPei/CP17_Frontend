import { Component, OnInit } from '@angular/core';
// import { SebmGoogleMap, MapsAPILoader, NoOpMapsAPILoader } from '@agm/core';
import { MapsAPILoader, NoOpMapsAPILoader } from '@agm/core';
// import { MarkerClusterDirective } from './direcitve/marker-cluster.directive';

@Component({
  selector: 'site-map',
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.css'],
  providers: [
    {
      provide: MapsAPILoader, useClass: NoOpMapsAPILoader
    }],
})
export class SiteMapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
