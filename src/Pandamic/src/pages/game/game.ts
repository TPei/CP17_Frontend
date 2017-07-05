import { Component, ViewChild, ElementRef } from '@angular/core';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
// import { NavController } from 'ionic-angular';
//import { Geolocation } from '@ionic-native/geolocation';
// import { MapComponent } from '../../app/component/map/map.component';
import { GlobalVariables } from './map-styles';
// import { GameService } from '../../services/game.service';
// import { GameService } from '../../providers/restgame.service';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
// import 'rxjs/add/operator/toPromise';

declare var google;

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
  providers: [GlobalVariables,RestApiProvider]
})

export class GamePage {
  location: any;
  currentCord: number[] = [];
  // geolocation: any = "";

  @ViewChild('map') mapElement: ElementRef;


  styles: any;

  // constructor(
  // public navCtrl: NavController,
  // private globalVariables:GlobalVariables,
  // private gameService : GameService) {

  //   this.styles = globalVariables.styles;
  // }
  
  map: any;
  local: any;
  game_data: any = '';
  locations: any = [];
  player_location_data: any = '';


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private globalVariables: GlobalVariables,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public geolocation: Geolocation,
    private restApi:RestApiProvider) {
    

    this.styles = globalVariables.styles;

  }


  ionViewDidLoad() {
    this.game_data = this.navParams.get('map');
    this.player_location_data = this.navParams.get('player');
    this.locations = this.game_data.locations;

    this.geolocation.getCurrentPosition().then((position) => {

      this.currentCord[0] = position.coords.latitude;
      this.currentCord[1] = position.coords.longitude;
      // this.location = position;
      // let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //  console.log('init');
    //   console.log(this.currentCord[0]);
    //   console.log( this.currentCord[1]);
      // let mapOptions = {
      //   center: latLng,
      //   zoom: 15,
      //   mapTypeId: google.maps.MapTypeId.ROADMAP
      // }
 
      // this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
    }, (err) => {
      console.log(err);
    })




    this.loadMap();
    this.addMarkers();
    this.addPlayerMarkers();

  }
  //Add the disease markers in the google map
  addMarkers() {
    for (var _i = 0; _i < this.locations.length; _i++) {
      this.addMarker(this.locations[_i].latitude,
        this.locations[_i].longitude,
        this.locations[_i].alias,
        this.locations[_i].color,
        this.locations[_i].research_building,
        this.locations[_i].cubes);
    }
  }



  addPlayerMarkers() {
    this.restApi.get_game_data("1");
    for (var _i = 0; _i < this.player_location_data.length; _i++) {

      let player_img = '/assets/img/Doctor-icon.png';
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(this.player_location_data[_i].at.latitude,
          this.player_location_data[_i].at.longitude),
        icon: player_img
      });
      this.add_player_informations(marker, this.player_location_data[_i].name);
    }
  }


  addDiseaseMarkers() {
    for (var _i = 0; _i < this.player_location_data.length; _i++) {

      let player_img = 'https://cdn.wikimg.net/strategywiki/images/3/33/Athena_player_sprite.png';
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(this.player_location_data[_i].at.latitude,
          this.player_location_data[_i].at.longitude),
        icon: player_img
      });
      this.add_player_informations(marker, this.player_location_data[_i].name);
    }
  }


  //Load the map and initialized with a mid value
  loadMap() {
    console.log(this.location);
    //location 6 has to be changed to Mid count of location length
    let latLng = new google.maps.LatLng(this.locations[6].latitude,
      this.locations[6].longitude);
    let mapOptions = {
      center: latLng,
      zoom: 14,
      minZoom:  10,
      maxZoom:  15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: this.styles,
      zoomControl: false,
      streetViewControl: false,
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }


  addMarker(lattitue: number, lognitute: number, alias: string, color: string, research_building: boolean, cube_info: string) {
    // let location_img = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    let location_img: string = "";
    if(color=="red"){
      location_img = '/assets/img/Map-Marker-Ball-Pink-icon.png';
    } 
    else if (color=="black"){
       location_img = '/assets/img/MapMarker_Ball__Black.png';
    }
     
    
    let research_centre_img = '/assets/img/office-building-icon.png';
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(lattitue, lognitute),
      icon: location_img
    });

    let _alias = alias;

    if (research_building) {
      new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(lattitue, lognitute),
        icon: research_centre_img
      });
    }
    this.addController(marker, _alias, color, cube_info);
  }

  //Add control and cube informations 
  addController(marker, content, color, cube_info) {
    //  console.log("cube data : "+ JSON.stringify(cube_info));
    let infoWindow = new google.maps.InfoWindow({
      content: 'this is : ' + content + '\n' + 'color is : ' + color
    });

    google.maps.event.addListener(marker, 'click', () => {
      console.log("1");
      infoWindow.open(this.map, marker);
      if(!this.isMove){
      this.presentPrompt();
      }else {
        this.movePrompt(marker);
      }
    });
  }

  add_Research_Controller(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: 'this is : ' + content
    });

    google.maps.event.addListener(marker, 'click', () => {
      console.log("2");
      infoWindow.open(this.map, marker);
      this.presentPrompt();
      // 
    });
  }



  add_player_informations(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: 'this is : ' + content
    });

    google.maps.event.addListener(marker, 'click', () => {
      console.log("3");
      infoWindow.open(this.map, marker);
      this.presentPrompt();

    });
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Button Open',
      // let bt_text = "";
      // if(player_role == ){

      // }

      buttons: [
        
        {
          text: 'Cure',
          handler: data => {
            let user_id = "1";
            this.cure(user_id, "red", 5);
          }
        },
        {
          text: 'Move',
          handler: data => {
            let user_id = "1";
            this.currentCord
            this.move(user_id, this.currentCord);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            this.isMove = false;
            console.log('Cancel');

          }
        },
      ]
    });
    alert.present();
  }


  movePrompt(marker:any) {
    let alert = this.alertCtrl.create({
      title: 'Move to new place',
      // let bt_text = "";
      // if(player_role == ){

      // }

      buttons: [
        
        {
          text: this.isMove==true?'Move Here':'Move',
          handler: data => {
            let user_id = "1";
            this.currentCord[0] = marker.getPosition().lat();
            this.currentCord[1] = marker.getPosition().lng();
            this.move(user_id, this.currentCord);
          }
        },
        {
          text: this.isMove==true?'Cancel Move':'Cancel',
          role: 'cancel',
          handler: data => {
            this.isMove = false;
            console.log('Cancel');

          }
        },
      ]
    });
    alert.present();
  }




  cure(userId, diseaseType, noofCubes) {

    let data:  Map<string, string> = new Map<string, string>();
    data.set("user_id",userId);
    data.set("disease_type",userId);
    data.set("noofCuber",userId);
    data.set("userLat",this.currentCord[0].toString());
    data.set("userLong",this.currentCord[1].toString());
    
    let x= {
      "type": "treat",
      "location": {
        "x": this.currentCord[0].toString(),
        "y": this.currentCord[1].toString()
      },
      "player_id": userId,
      "game_id": "1",
      "disease": diseaseType
    };
    let response = this.restApi.post_game_data(x,"/action");
     console.log(response);
     this.ionViewDidLoad();

    // data["user_id"] = userId;
    // data["disease_type"] = diseaseType;
    // data["noofCuber"] = noofCubes;
    // data["userLat"] = 15.2231; //userLat;
    // data["userLong"] = 21.2211;//userLong;
    // console.log(this.location);
    // // let latLng : any;
    //  this.geolocation.getCurrentPosition().then((position) => {
 
    //   let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //   console.log("in coordiantes");
    //   console.log(position.coords.latitude);
    //   console.log(position.coords.longitude);
    //   this.currentCord[0] = position.coords.latitude;
    //   this.currentCord[1] = position.coords.longitude;
    //   // let mapOptions = {
    //   //   center: latLng,
    //   //   zoom: 15,
    //   //   mapTypeId: google.maps.MapTypeId.ROADMAP
    //   // }
 
    //   // this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
    // }, (err) => {
    //   console.log(err);
    // });
    // navigator.geolocation.getCurrentPosition(this.getPosition);
    // console.log("outside");
    // console.log(this.currentCord[0]);
    // console.log(this.currentCord[1]);
    // this.geolocation.getCurrentPosition().then((position) => {
 
    //   latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //   console.log(latLng);
    // },(err) => {
    //   console.log(err);
    // });

  }
  isMove:boolean = false;
  move(user_id, locationCords){
    if(!this.isMove){
    this.isMove = true;
    this.showToastMessage ("select destination");
  } else {
    let x= {
      "type": "move",
      "location": {
        "x": this.currentCord[0].toString(),
        "y": this.currentCord[1].toString()
      },
      "player_id": user_id,
      "game_id": "1",
      "disease": ""
    };
    this.restApi.post_game_data(x,"/action");
    this.isMove = false;
     this.ionViewDidLoad();
  }
  }

  build(building_type) {

  }
 getPosition(position):void {
   let cord : any[] = [];

   this.currentCord.push(position.coords.latitude);
   this.currentCord.push(position.coords.longitude);
  //  this.currentCord = cord;
  setTimeout(handler=>{
    console.log(this.currentCord[0]);
    console.log(this.currentCord[1]);
  },300);
    
}


showToastMessage(info : string) {
    let toast = this.toastCtrl.create({
      message: info,
      duration: 3000
    });
    toast.present();
  }


}

  // }
  // google maps zoom level
  // minZoom: number = 10;
  // maxZoom: number = 15;

  // // initial center position for the map
  // lat: number = 51.673858;
  // lng: number = 7.815982;

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



  // ionViewDidLoad() {
  //   this.loadMap();
  // }

  // loadMap() {

  //   let latLng = new google.maps.LatLng(-34.9290, 138.6010);

  //   let mapOptions = {
  //     center: latLng,
  //     zoom: 15,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   }

  //   this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  // }

  //   addMarker() {
  //     let image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  //     let marker = new google.maps.Marker({
  //       map: this.map,
  //       animation: google.maps.Animation.DROP,
  //       position: this.map.getCenter(),
  //       icon: image
  //     });

  //     let content = "<h4>Information!</h4>";

  //     this.addInfoWindow(marker, content);

  //   }

  //   addInfoWindow(marker, content) {

  //     let infoWindow = new google.maps.InfoWindow({
  //       content: content
  //     });

  //     google.maps.event.addListener(marker, 'click', () => {
  //       infoWindow.open(this.map, marker);
  //     });

  //   }
  // }
  // just an interface for type safety.
  // interface marker {
  // 	lat: number;
  // 	lng: number;
  // 	label?: string;
  // 	draggable: boolean;
  //   iconUrl:string;
  // }

// }
