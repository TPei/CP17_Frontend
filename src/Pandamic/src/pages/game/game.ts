import { Component, ViewChild, ElementRef } from '@angular/core';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { GlobalVariables } from './map-styles';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LocalstorageProvider } from '../../providers/localstorage/localstorage';


declare var google;

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
  providers: [GlobalVariables,RestApiProvider]
})

export class GamePage {
  location: any;
  currentCord: number[] = [];
  userId:string = "DefaultPlayer";
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
  game_id:any= "1";
  public Token_Data : any  = '';
  refresh_map : any = '';


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
    this.localStr.get_data("player_id1").then((val) => {
      this.default_player_name = val;
    });

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
    this.TokenCount();
    }, (err) => {
      console.log(err);
    })

  }

  refresh_game_data(){
    this.restApi.get_game_data("1").then((result)=> {
      let game: any = result['game'];
      this.game_data = game.map;
      this.player_location_data = game.player;
      this.locations = this.game_data.locations;    
       }, (err) => {
       console.log("data failed 1");
    });
  }


  //Add the disease markers in the google map
  addMarkers() {
    // console.log(this.locations);
    for (var _i = 0; _i < this.locations.length; _i++) {
      this.addMarker(this.locations[_i].latitude,
        this.locations[_i].longitude,
        this.locations[_i].alias,
        this.locations[_i].color,
        this.locations[_i].research_building,
        this.locations[_i].cubes);        
    }
  }

  playerMarker : any ='';

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
      setInterval(() => {this.refreshPlayerLocation();}, 2000);
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



  TokenCount(){
      for (var _i = 0; _i < this.player_location_data.length; _i++) {
        if(this.player_location_data[_i].name == this.default_player_name ){
          this.Token_Data = " TOKENS =>  ";
        for (var _k = 0; _k < this.player_location_data[_i].tokens.disease_tokens.length; _k++) {
           this.Token_Data=  this.Token_Data + " "+this.player_location_data[_i].tokens.disease_tokens[_k].color + " : "
                               + this.player_location_data[_i].tokens.disease_tokens[_k].count;
                               console.log("Coloer : "+this.player_location_data[_i].tokens.disease_tokens[_k].color );
            }
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
   let location_img: string = "/assets/img/map-marker-icon.png"; 
    let research_centre_img = "/assets/img/office-building-icon.png";
    let marker = new google.maps.Marker({
      map: this.map,
      // animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(lattitue, longitute),
      icon: location_img
    });

    let _alias = alias;
    console.log(Number(Number(lattitue)+50));
    if (research_building) { console.log("dsfdsf");

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
    let disease_lat = 0;

    var decPart_lng = (lng+"").split(".");
    let disease_lng = 0;
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

       let infoWindow = new google.maps.InfoWindow({
         content: 'cube count: ' + element.count
      });

    google.maps.event.addListener(marker, 'click', () => {
      
      infoWindow.open(this.map, marker);
      this.treatmentPrompt(marker);
      // if(!this.isMove){
      // this.presentPrompt();
      // }else {
      //   this.movePrompt(marker);
      // }
    });

    });
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
      this.presentPrompt(marker);
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
      this.presentPrompt(marker);
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
      this.presentPrompt(marker);

    });
  }

  presentPrompt(marker) {
    let alert = this.alertCtrl.create({
      title: 'Actions',
      // let bt_text = "";
      // if(player_role == ){

      // }

      buttons: [
        
        {
          text: 'Cure',
          handler: data => {
            let user_id = this.userId;
            this.cure_treat('cure',user_id, marker['customInfo'], 5);
          }
        },
        {
          text: 'Move',
          handler: data => {
            let user_id = this.userId;
            
            this.move(user_id, this.currentCord);
          }
        },
        {
          text: 'Build Research Center',
          handler: data => {
          let user_id = this.userId;
            
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
      // let bt_text = "";
      // if(player_role == ){

      // }

      buttons: [
        
        {
          text: this.isMove==true?'Move Here':'Move',
          handler: data => {
            let user_id = this.userId;
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
            // console.log('Cancel');

          }
        },
      ]
    });
    alert.present();
  }


  treatmentPrompt(marker:any) {
    let alert = this.alertCtrl.create({
      title: 'Treat the cure',
      // let bt_text = "";
      // if(player_role == ){

      // }

      buttons: [
        
         {
          text: 'Cure',
          handler: data => {
            let user_id = this.userId;
            this.cure_treat("cure",user_id, marker['customInfo'], 1);
          }
        },
        {
          text: 'Treat',
          handler: data => {
            let user_id = this.userId;
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

    let response = this.restApi.post_game_data(this.dataForCureMoveBuild(type,userId,this.currentCord,this.game_id,diseaseType),"/action");
     console.log(response);
     this.ionViewDidLoad();


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

    this.restApi.put_game_data(this.dataForCureMoveBuild("move",user_id,this.currentCord,this.game_id,""),"/action");
    this.isMove = false;
     this.ionViewDidLoad();
  }
  }

  build(user_id,building_type) {
    this.restApi.post_game_data(this.dataForCureMoveBuild("build_research",user_id,this.currentCord,this.game_id,""),"/action");
    this.isMove = false;
    this.ionViewDidLoad();
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
