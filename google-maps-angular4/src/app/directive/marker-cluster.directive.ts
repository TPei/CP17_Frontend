import { Directive } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { GoogleMap, Marker } from '@agm/core/services/google-maps-types';
// npm install js-marker-clusterer --save
// import 'js-marker-clusterer/src/markerclusterer.js';

declare const google;
declare const MarkerClusterer;

@Directive({
  selector: '[googlemapdirective]'
})



export class MarkerClusterDirective {

  googleMarkers : any;
  _map: any;
  
  zoom: number = 3;
  lat: number = 51.673858;
  lng: number = 7.815982;
  

  markers: marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982
	  }
  ]

   initMarkers(){
    let i = 0;
    let markers = this.markers;
    var result = [];
    for ( ; i < markers.length; ++i ){
       result.push( new google.maps.Marker({
            position : markers[ i ] 
        })
       );
    }
    return result;
  }



  constructor (private gmapsApi: GoogleMapsAPIWrapper) {console.log('dsfsdfsdds');
    var me = this;
    this.gmapsApi.getNativeMap().then(map => {
      // instance of the map.
      me._map = map;
      me.initializeMap();
    });
  }

  initializeMap(){
      var me = this;
      me.googleMarkers = me.initMarkers();
      var mc = new MarkerClusterer( me._map, me.googleMarkers, { imagePath: 'https://googlemaps.github.io/js-marker-clusterer/images/m' } );
  }

}

interface marker {
	lat: number;
	lng: number;
}




// import { Directive, OnDestroy, OnInit, Input, ElementRef } from '@angular/core';
// import { GoogleMapsAPIWrapper } from '@agm/core';
// import { GoogleMap, Marker } from '@agm/core/services/google-maps-types';
// import { Observable } from 'rxjs';

// declare const google;
// declare const MarkerClusterer;
// @Directive({
//   selector: '[appMarkerCluster]',
//   providers:[GoogleMapsAPIWrapper]
// })
// export class MarkerClusterDirective implements OnInit {

//   @Input()
//   points: any[];

//   constructor(private gmapsApi: GoogleMapsAPIWrapper,private el: ElementRef) {
//   }


//   ngOnInit() {

//     this.gmapsApi.getNativeMap().then(map => {

//       let markerIcon = {
//         url: "assets/marker.png", // url
//         scaledSize: new google.maps.Size(35, 35)
//       }


//       let style = {
//         url: "assets/cluster.png",
//         height: 40,
//         width: 40,
//         textColor: '#FFF',
//         textSize: 11,
//         backgroundPosition: "center center"
//       };

//       let options = {
//         imagePath: "/assets/cluster",
//         gridSize: 70,
//         styles: [style, style, style]
//       };

//       let markers = [];


//       Observable
//         .interval(500)
//         .skipWhile((s) => this.points == null || this.points.length <= 0)
//         .take(1)
//         .subscribe(() => {
//           for (let point of this.points) {
//             let marker = new google.maps.Marker({
//               position: new google.maps.LatLng(point.Latitude, point.Longitude),
//               icon: markerIcon
//             });
//             markers.push(marker);
//           }

//           var markerCluster = new MarkerClusterer(map, markers, options);

//         })
//     });

//   }


// }
