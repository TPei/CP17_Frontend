import { Component, ViewChild, ElementRef } from '@angular/core';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { GlobalVariables } from './map-styles';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LocalstorageProvider } from '../../providers/localstorage/localstorage';
import { Game_Constants } from '../../providers/Game_Constants/gameconstants';
import { MainMenuPage } from '../main-menu/main-menu';




declare var google;

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
  providers: [GlobalVariables,RestApiProvider]
})

export class GamePage {
  location: any;
  currentCord: number[] = [];
  dieaseMarkerDistance: number = 20;
  @ViewChild('map') mapElement: ElementRef;


  styles: any;  
  map: any;
  local: any;
  game_data: any = '';
  locations: any = [];
  player_location_data: any = '';
  isMove:boolean = false;
  edges : any = [];
  from_location_latitude :any =[];
  from_location_longitude :any =[]; 
  to_location_latitude :any =[];
  to_location_longitude :any =[]; 
  default_player_name : any = ''; 
  refresh_map : any = '';
  playerMarker : any ='';


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private globalVariables: GlobalVariables,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public geolocation: Geolocation,
    private restApi:RestApiProvider,
    private localStr: LocalstorageProvider) {
    
    this.styles = globalVariables.styles;
           if(!Game_Constants.APP_FORCE_START){
              this.localStr.get_data(Game_Constants.player_name_string).then((val) => {
               this.default_player_name = val;
                });
              }else{
                this.default_player_name = 'DefaultPlayer';
            }
  }


  ionViewDidLoad() {
    this.game_data = this.navParams.get('map');
    this.player_location_data = this.navParams.get('player');
    this.locations = this.game_data.locations;
    this.edges = this.game_data.edges;
    this.geolocation.getCurrentPosition().then((position) => {
    this.currentCord[0] = position.coords.latitude;
    this.currentCord[1] = position.coords.longitude;
    this.loadMap();
    this.addMarkers();
    this.addOtherPlayersMarkers();
    this.addMainPlayer();
    this.fetchMarkers();
    this.connectMarkers();
    }, (err) => {
     this.showToastMessage("Problem in fetching Player Position");
    })

  }

  refresh_game_data(){
     let game: any = '';
     this.restApi.get_game_data(Game_Constants.DEFAULT_GAME_ID).then((result)=> {
     game = result['game'];
     this.game_data = game.map;
     this.player_location_data = game.player;
     this.locations = this.game_data.locations; 
         if(!Game_Constants.APP_FORCE_START){
         this.gamewin_loose(game);   
         }
       }, (err) => {
       this.showToastMessage ("Error in API or Internet Not working");
    });
  }


  gamewin_loose(game){

      let alert = this.alertCtrl.create({
      title: game.won==true?'You Won The Game.':'You Loose The Game.',
      buttons: [
        {
          text: 'Go Back Home',
          role: 'Go Back Home',
          handler: data => {
           this.navCtrl.push(MainMenuPage);
          }
        },
        {
          text: 'cancel',
          role: 'cancel',
          handler: data => {
          }
        },
      ]
    });
    alert.present();
  }


  //Add the disease markers in the google map
  addMarkers() {    for (var _i = 0; _i < this.locations.length; _i++) {
      this.addMarker(this.locations[_i].latitude,
        this.locations[_i].longitude,
        this.locations[_i].alias,
        this.locations[_i].color,
        this.locations[_i].research_building,
        this.locations[_i].cubes);        
    }
  }



  addMainPlayer(){
     for (var _i = 0; _i < this.player_location_data.length; _i++) {
       let default_player = '/assets/img/default_player.png';
      if(this.player_location_data[_i].name == this.default_player_name ){
        this.playerMarker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(this.currentCord[0], this.currentCord[1]),
        icon: default_player
      });
      this.add_player_informations(this.playerMarker, this.player_location_data[_i].name);
      setInterval(() => {this.refreshPlayerLocation();}, 100);
      }
    }
   }


   refreshPlayerLocation() {
     this.geolocation.getCurrentPosition().then((position) => {
     this.currentCord[0] = position.coords.latitude;
     this.currentCord[1] = position.coords.longitude;
     this.playerMarker.position = new google.maps.LatLng(this.currentCord[0], this.currentCord[1]);
     this.playerMarker.center = new google.maps.LatLng(this.currentCord[0], this.currentCord[1]);
    }, (err) => {
      console.log(err);
    })
}


     

  addOtherPlayersMarkers() {
    for (var _i = 0; _i < this.player_location_data.length; _i++) {
      let player_img = '/assets/img/Doctor-icon.png';
      if(this.player_location_data[_i].name != this.default_player_name ){
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
  }

  //Load the map and initialized with a mid value
  loadMap() {
    // console.log(this.location);
    //location 6 has to be changed to Mid count of location length
    let latLng = new google.maps.LatLng(this.currentCord[0],
      this.currentCord[1]);
      
    let mapOptions = {
      center: latLng,
      zoom: 15,
      // minZoom:  10,
      // maxZoom:  15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: this.styles,
      zoomControl: false,
      streetViewControl: false,
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }


  addMarker(lattitue: number, longitute: number, alias: string, color: string, research_building: boolean, cube_info: string) {
   let location_img: string = '';
   if(color == "blue"){
    location_img = "/assets/img/map-marker-icon-blue.png";
   } else if(color == "yellow"){
      location_img = "/assets/img/map-marker-icon-yellow.png";
   } else if(color == "green"){
      location_img = "/assets/img/map-marker-icon-green.png";
   } else if(color == "red"){
      location_img = "/assets/img/map-marker-icon-red.png"
   } 

    let research_centre_img = "/assets/img/office-building-icon.png";
    let marker = new google.maps.Marker({
      map: this.map,
      // animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(lattitue, longitute),
      icon: location_img
    });

    let _alias = alias;
    // console.log(Number(Number(lattitue)+50));
    if (research_building) { 

      let arr = this.modifiedLatLng(lattitue,longitute);

       marker = new google.maps.Marker({
        map: this.map,
        // animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(arr[0], arr[1]),
        icon: research_centre_img
      });
      // this.add_Research_Controller(research_marker,"Research Center");
    }

    this.addDiseaseMarkers(lattitue, longitute,cube_info);


    this.addController(marker, _alias, color, cube_info);
  }


  modifiedLatLng(lat,lng) : any[]{
    var decPart_lat = (lat+"").split(".");
    var decPart_lng = (lng+"").split(".");
    this.dieaseMarkerDistance = 300;
    let coor : any[] = [];

    coor.push(Number(decPart_lat[0] + "." + Number(Number(decPart_lat[1]) + this.dieaseMarkerDistance)));
    coor.push(Number(decPart_lng[0] + "." + Number(Number(decPart_lng[1]) + this.dieaseMarkerDistance)));
    return coor;
  }





  fetchMarkers(){

    for (var _i = 0; _i < this.edges.length; _i++) {
       for (var _j = 0; _j < this.locations.length; _j++) {         
           if(this.locations[_j].id==this.edges[_i].from){
               this.from_location_latitude[_i] = this.locations[_j].latitude;
               this.from_location_longitude[_i] = this.locations[_j].longitude;
           }
        }
    }

    for (var _i = 0; _i < this.edges.length; _i++) {
       for (var _j = 0; _j < this.locations.length; _j++) {         
           if(this.locations[_j].id==this.edges[_i].to){
               this.to_location_latitude[_i] = this.locations[_j].latitude;
               this.to_location_longitude[_i] = this.locations[_j].longitude;
           }
        }
    }
 }

  connectMarkers(){
    for (var _i = 0; _i < this.from_location_latitude.length; _i++) {
       this.showMarkers(this.from_location_latitude[_i],
        this.from_location_longitude[_i],
        this.to_location_latitude[_i],
        this.to_location_longitude[_i]);
    }
  }


   showMarkers(startLat,startLong,endLat, endLong){

      var flightPlanCoordinates = [
          {lat: startLat, lng: startLong},
          {lat: endLat, lng: endLong}
        ];
        var flightPath = new google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: true,
          strokeColor: '#00ccbe',
          strokeOpacity: 5,
          strokeWeight: 3
        });

        flightPath.setMap(this.map);

   }


  addDiseaseMarkers(lat,lng,cubeInfo) {
    // console.log("disease marker");

    var decPart_lat = (lat+"").split(".");
    let disease_lat = 0;

    var decPart_lng = (lng+"").split(".");
    let disease_lng = 0;

    let img:string = "";
    // console.log(cubeInfo);
    cubeInfo.forEach(element => { //console.log(element.color);
    if (element.count<=0){
        return ;
    }
    if(element.color == "red"){
     img = "/assets/img/Map-Marker-Ball-Pink-icon.png";
     disease_lat = Number(decPart_lat[0] + "." + Number(Number(decPart_lat[1]) + this.dieaseMarkerDistance));
     disease_lng = Number(decPart_lng[0] + "." + Number(Number(decPart_lng[1]) + this.dieaseMarkerDistance));
    }  
    else if (element.color == "blue"){
       img = '/assets/img/Map-Marker-Ball-Azure.png';
       disease_lat = Number(decPart_lat[0] + "." + Number(Number(decPart_lat[1]) + this.dieaseMarkerDistance));
       disease_lng = Number(decPart_lng[0] + "." + Number(Number(decPart_lng[1]) - this.dieaseMarkerDistance));
    }
    else if (element.color=="yellow"){
      //  img = '/assets/img/MapMarker_Ball__Black.png';
       img = '/assets/img/MapMarker_Ball_Black2.png';
       disease_lat = Number(decPart_lat[0] + "." + Number(Number(decPart_lat[1]) - this.dieaseMarkerDistance));
       disease_lng = Number(decPart_lng[0] + "." + Number(Number(decPart_lng[1]) + this.dieaseMarkerDistance));
    }
    else if (element.color == "green"){
       img = "/assets/img/Map-Marker-Ball-Chartreuse.png";
       disease_lat = Number(decPart_lat[0] + "." + Number(Number(decPart_lat[1]) - this.dieaseMarkerDistance));
       disease_lng = Number(decPart_lng[0] + "." + Number(Number(decPart_lng[1]) - this.dieaseMarkerDistance));
    }
      // console.log("disease marker2");
    // let player_img = 'https://cdn.wikimg.net/strategywiki/images/3/33/Athena_player_sprite.png';
      let marker = new google.maps.Marker({
        map: this.map,
        // animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(disease_lat,disease_lng),
        icon: img,
        customInfo:element.color
      });

    google.maps.event.addListener(marker, 'click', () => {
 
      this.treatmentPrompt(marker ,'cube count: ' + element.count);

    });

    });
  }


  //Add control and cube informations 
  addController(marker, content, color, cube_info) {
    google.maps.event.addListener(marker, 'click', () => {
      if(!this.isMove){
      this.presentPrompt(marker , 'Location : ' + content, 'Color : ' + color);
      }else {
        this.movePrompt(marker);
      }
    });
  }




  add_Research_Controller(marker, content) {

    google.maps.event.addListener(marker, 'click', () => {
      this.presentPrompt(marker,'Location : ' + content,"");
    });
  }



  add_player_informations(marker, content) {
    google.maps.event.addListener(marker, 'click', () => {
      this.presentPrompt(marker,'this is : ' + content,"");

    });
  }

  presentPrompt(marker, info , message) {
    let alert = this.alertCtrl.create({
      title: 'Actions',
      subTitle : info,
      message : message,

      buttons: [
        
        {
          text: 'Cure',
          handler: data => {
            let user_id = this.default_player_name;
            this.cure_treat('cure',user_id, marker['customInfo'], 5);
          }
        },
        // {
        //   text: 'Move',
        //   handler: data => {
        //     let user_id = this.default_player_name;
            
        //     this.move(user_id, this.currentCord);
        //   }
        // },
        {
          text: 'Build Research Center',
          handler: data => {
          let user_id = this.default_player_name;
            
          this.build(user_id, this.currentCord);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            this.isMove = false;
        

          }
        },
      ]
    });
    alert.present();
  }


  movePrompt(marker:any) {
    let alert = this.alertCtrl.create({
      title: 'Move to new place',
      buttons: [
        {
          text: this.isMove==true?'Move Here':'Move',
          handler: data => {
            let user_id = this.default_player_name;
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
          }
        },
      ]
    });
    alert.present();
  }


  treatmentPrompt(marker:any , info: string) {
    let alert = this.alertCtrl.create({
      title: 'Treat the cure',
      subTitle : info,
      buttons: [
        
         {
          text: 'Cure',
          handler: data => {
            let user_id = this.default_player_name;
            this.cure_treat("cure",user_id, marker['customInfo'], 1);
          }
        },
        {
          text: 'Treat',
          handler: data => {
            let user_id = this.default_player_name;
            console.log(marker['customInfo']);
            this.cure_treat("treat",user_id, marker['customInfo'], 1);
          }
        },
        {
          text: this.isMove==true?'Cancel Move':'Cancel',
          role: 'cancel',
          handler: data => {
            this.isMove = false;
            // console.log('Cancel');

          }
        },
      ]
    });
    alert.present();
  }

   cure_treat(type,userId, diseaseType, noofCubes) {

    this.restApi.post_game_data(this.dataForCureMoveBuild(type,userId,this.currentCord,Game_Constants.DEFAULT_GAME_ID,diseaseType),"/action")
    .then((result)=>{
       this.showToastMessage('STATUS :'+ JSON.stringify(result));
    },(err)=>{
      if(err.data.message != 'undefined'){
        this.showToastMessage('STATUS :'+err.data.success+'  '+err.data.message);
      }else{
        this.showToastMessage('STATUS :'+err.data.success);
      } 
    });
     this.refresh_game_data();
   }


  
  dataForCureMoveBuild(type,user_id,coord, game_id,disease_color){
    let x= {
      "type": type,
      "location": {
        "x": coord[0].toString(),
        "y": coord[1].toString()
      },
      "player_id": user_id,
      "game_id": game_id,
      "disease": disease_color
    };

    return x;
  }
 

  move(user_id, locationCords){
    if(!this.isMove){
    this.isMove = true;
    this.showToastMessage ("select destination");
    } else {
    this.restApi.put_game_data(
      this.dataForCureMoveBuild("move",user_id,this.currentCord,Game_Constants.DEFAULT_GAME_ID,""),"/action")
       .then((result)=> {
         let response = result['data'];
             if(response.success){
               this.showToastMessage("Movement Successful");
             } else{
               this.showToastMessage("Movement Failed");
             }   
           }, (err) => {
           this.showToastMessage ("Error in API or Internet Not working");
        });
      this.isMove = false;
      this.refresh_game_data();
  }
  }

  build(user_id,building_type) {
    this.restApi.post_game_data(this.dataForCureMoveBuild("build_research",user_id,this.currentCord,Game_Constants.DEFAULT_GAME_ID,""),"/action")
    .then((result)=> {
         this.showToastMessage('STATUS :' + JSON.stringify(result));   
       }, (err) => {  
          if(err.data.message != 'undefined'){
              this.showToastMessage('STATUS :'+err.data.success+'  '+err.data.message);
            }else{
              this.showToastMessage('STATUS :'+err.data.success);
            } 
    });
    this.isMove = false;
    this.refresh_game_data();
  }
 getPosition(position):void {
   this.currentCord.push(position.coords.latitude);
   this.currentCord.push(position.coords.longitude);
}


showToastMessage(info : string) {
    let toast = this.toastCtrl.create({
      message: info,
      duration: 3000
    });
    toast.present();
  }

}
