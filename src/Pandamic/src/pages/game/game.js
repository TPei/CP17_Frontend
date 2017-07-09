var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
import { LocalstorageProvider } from '../../providers/localstorage/localstorage';
var GamePage = (function () {
    function GamePage(navCtrl, navParams, globalVariables, toastCtrl, alertCtrl, geolocation, restApi, localStr) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.globalVariables = globalVariables;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.geolocation = geolocation;
        this.restApi = restApi;
        this.localStr = localStr;
        this.currentCord = [];
        // geolocation: any = "";
        this.dieaseMarkerDistance = 170;
        this.game_data = '';
        this.locations = [];
        this.player_location_data = '';
        this.isMove = false;
        this.edges = [];
        this.from_location_latitude = [];
        this.from_location_longitude = [];
        this.to_location_latitude = [];
        this.to_location_longitude = [];
        this.default_player_name = '';
        this.styles = globalVariables.styles;
        this.localStr.get_data("player_id1").then(function (val) {
            _this.default_player_name = val;
        });
    }
    GamePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.game_data = this.navParams.get('map');
        this.player_location_data = this.navParams.get('player');
        this.locations = this.game_data.locations;
        this.edges = this.game_data.edges;
        this.geolocation.getCurrentPosition().then(function (position) {
            _this.currentCord[0] = position.coords.latitude;
            _this.currentCord[1] = position.coords.longitude;
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
            _this.loadMap();
            _this.addMarkers();
            _this.addPlayerMarkers();
            _this.fetchMarkers();
            _this.connectMarkers();
            _this.refresh_game_data();
        }, function (err) {
            console.log(err);
        });
    };
    GamePage.prototype.refresh_game_data = function () {
        var _this = this;
        this.restApi.get_game_data("1").then(function (result) {
            var game = result['game'];
            _this.game_data = game.map;
            _this.player_location_data = game.player;
            _this.locations = _this.game_data.locations;
            console.log("refresh game is :" + game.player.);
        }, function (err) {
            console.log("data failed 1");
        });
    };
    //Add the disease markers in the google map
    GamePage.prototype.addMarkers = function () {
        console.log(this.locations);
        for (var _i = 0; _i < this.locations.length; _i++) {
            this.addMarker(this.locations[_i].latitude, this.locations[_i].longitude, this.locations[_i].alias, this.locations[_i].color, this.locations[_i].research_building, this.locations[_i].cubes);
        }
    };
    GamePage.prototype.addPlayerMarkers = function () {
        this.restApi.get_game_data("1");
        for (var _i = 0; _i < this.player_location_data.length; _i++) {
            var player_img = '/assets/img/Doctor-icon.png';
            var default_player = '/assets/img/default_player.png';
            if (this.player_location_data[_i].name == this.default_player_name) {
                var marker = new google.maps.Marker({
                    map: this.map,
                    animation: google.maps.Animation.DROP,
                    position: new google.maps.LatLng(this.player_location_data[_i].at.latitude, this.player_location_data[_i].at.longitude),
                    icon: default_player
                });
                this.add_player_informations(marker, this.player_location_data[_i].name);
            }
            else {
                var marker = new google.maps.Marker({
                    map: this.map,
                    animation: google.maps.Animation.DROP,
                    position: new google.maps.LatLng(this.player_location_data[_i].at.latitude, this.player_location_data[_i].at.longitude),
                    icon: player_img
                });
                this.add_player_informations(marker, this.player_location_data[_i].name);
            }
        }
    };
    //  updatePlayerPosition(){
    //       this.geolocation.getCurrentPosition().then((position) => {
    //       this.currentCord[0] = position.coords.latitude;
    //       this.currentCord[1] = position.coords.longitude;
    //        }, (err) => {
    //       console.log(err);
    //     })
    //   latitude = parseInt(document.getElementById('latitude').value, 10);
    //   longtitude = parseInt(document.getElementById('longtitude').value, 10);
    //   myLatlng = new google.maps.LatLng(latitude, longtitude);
    //   marker.setPosition(myLatlng);
    //   map.setCenter(myLatlng);
    // }
    //Load the map and initialized with a mid value
    GamePage.prototype.loadMap = function () {
        console.log(this.location);
        //location 6 has to be changed to Mid count of location length
        var latLng = new google.maps.LatLng(this.currentCord[0], this.currentCord[1]);
        var mapOptions = {
            center: latLng,
            zoom: 15,
            // minZoom:  10,
            // maxZoom:  15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: this.styles,
            zoomControl: false,
            streetViewControl: false,
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    };
    GamePage.prototype.addMarker = function (lattitue, longitute, alias, color, research_building, cube_info) {
        //  let location_img = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
        var location_img = "http://icons.iconarchive.com/icons/paomedia/small-n-flat/64/map-marker-icon.png";
        var research_centre_img = '/assets/img/office-building-icon.png';
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(lattitue, longitute),
            icon: location_img
        });
        var _alias = alias;
        if (research_building) {
            new google.maps.Marker({
                map: this.map,
                animation: google.maps.Animation.DROP,
                position: new google.maps.LatLng(lattitue, longitute),
                icon: research_centre_img
            });
        }
        this.addDiseaseMarkers(lattitue, longitute, cube_info);
        this.addController(marker, _alias, color, cube_info);
    };
    GamePage.prototype.fetchMarkers = function () {
        for (var _i = 0; _i < this.edges.length; _i++) {
            for (var _j = 0; _j < this.locations.length; _j++) {
                if (this.locations[_j].id == this.edges[_i].from) {
                    this.from_location_latitude[_i] = this.locations[_j].latitude;
                    this.from_location_longitude[_i] = this.locations[_j].longitude;
                }
            }
        }
        for (var _i = 0; _i < this.edges.length; _i++) {
            for (var _j = 0; _j < this.locations.length; _j++) {
                if (this.locations[_j].id == this.edges[_i].to) {
                    this.to_location_latitude[_i] = this.locations[_j].latitude;
                    this.to_location_longitude[_i] = this.locations[_j].longitude;
                }
            }
        }
    };
    GamePage.prototype.connectMarkers = function () {
        for (var _i = 0; _i < this.from_location_latitude.length; _i++) {
            this.showMarkers(this.from_location_latitude[_i], this.from_location_longitude[_i], this.to_location_latitude[_i], this.to_location_longitude[_i]);
        }
    };
    GamePage.prototype.showMarkers = function (startLat, startLong, endLat, endLong) {
        var flightPlanCoordinates = [
            { lat: startLat, lng: startLong },
            { lat: endLat, lng: endLong }
        ];
        var flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#00ccbe',
            strokeOpacity: 5,
            strokeWeight: 3
        });
        flightPath.setMap(this.map);
    };
    GamePage.prototype.addDiseaseMarkers = function (lat, lng, cubeInfo) {
        var _this = this;
        console.log("disease marker");
        var decPart_lat = (lat + "").split(".");
        var disease_lat = 0;
        var decPart_lng = (lng + "").split(".");
        var disease_lng = 0;
        var img = "";
        console.log(cubeInfo);
        cubeInfo.forEach(function (element) {
            console.log(element.color);
            if (element.color == "red") {
                img = "/assets/img/Map-Marker-Ball-Pink-icon.png";
                disease_lat = Number(decPart_lat[0] + "." + Number(Number(decPart_lat[1]) + _this.dieaseMarkerDistance));
                disease_lng = Number(decPart_lng[0] + "." + Number(Number(decPart_lng[1]) + _this.dieaseMarkerDistance));
            }
            else if (element.color == "blue") {
                img = '/assets/img/Map-Marker-Ball-Azure.png';
                disease_lat = Number(decPart_lat[0] + "." + Number(Number(decPart_lat[1]) + _this.dieaseMarkerDistance));
                disease_lng = Number(decPart_lng[0] + "." + Number(Number(decPart_lng[1]) - _this.dieaseMarkerDistance));
            }
            else if (element.color == "yellow") {
                img = '/assets/img/MapMarker_Ball__Black.png';
                disease_lat = Number(decPart_lat[0] + "." + Number(Number(decPart_lat[1]) - _this.dieaseMarkerDistance));
                disease_lng = Number(decPart_lng[0] + "." + Number(Number(decPart_lng[1]) + _this.dieaseMarkerDistance));
            }
            else if (element.color == "green") {
                img = "/assets/img/Map-Marker-Ball-Chartreuse.png";
                disease_lat = Number(decPart_lat[0] + "." + Number(Number(decPart_lat[1]) - _this.dieaseMarkerDistance));
                disease_lng = Number(decPart_lng[0] + "." + Number(Number(decPart_lng[1]) - _this.dieaseMarkerDistance));
            }
            console.log("disease marker2");
            // let player_img = 'https://cdn.wikimg.net/strategywiki/images/3/33/Athena_player_sprite.png';
            var marker = new google.maps.Marker({
                map: _this.map,
                // animation: google.maps.Animation.DROP,
                position: new google.maps.LatLng(disease_lat, disease_lng),
                icon: img
            });
            var infoWindow = new google.maps.InfoWindow({
                content: 'cube count: ' + element.count
            });
            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open(_this.map, marker);
                // if(!this.isMove){
                // this.presentPrompt();
                // }else {
                //   this.movePrompt(marker);
                // }
            });
        });
        // for (var _i = 0; _i < this.player_location_data.length; _i++) {
        //   let player_img = 'https://cdn.wikimg.net/strategywiki/images/3/33/Athena_player_sprite.png';
        //   let marker = new google.maps.Marker({
        //     map: this.map,
        //     animation: google.maps.Animation.DROP,
        //     position: new google.maps.LatLng(this.player_location_data[_i].at.latitude,
        //       this.player_location_data[_i].at.longitude),
        //     icon: player_img
        //   });
        //   this.add_player_informations(marker, this.player_location_data[_i].name);
        // }
    };
    //Add control and cube informations 
    GamePage.prototype.addController = function (marker, content, color, cube_info) {
        var _this = this;
        //  console.log("cube data : "+ JSON.stringify(cube_info));
        var infoWindow = new google.maps.InfoWindow({
            content: 'this is : ' + content + '\n' + 'color is : ' + color
        });
        google.maps.event.addListener(marker, 'click', function () {
            console.log("1");
            infoWindow.open(_this.map, marker);
            if (!_this.isMove) {
                _this.presentPrompt();
            }
            else {
                _this.movePrompt(marker);
            }
        });
    };
    GamePage.prototype.add_Research_Controller = function (marker, content) {
        var _this = this;
        var infoWindow = new google.maps.InfoWindow({
            content: 'this is : ' + content
        });
        google.maps.event.addListener(marker, 'click', function () {
            console.log("2");
            infoWindow.open(_this.map, marker);
            _this.presentPrompt();
            // 
        });
    };
    GamePage.prototype.add_player_informations = function (marker, content) {
        var _this = this;
        var infoWindow = new google.maps.InfoWindow({
            content: 'this is : ' + content
        });
        google.maps.event.addListener(marker, 'click', function () {
            console.log("3");
            infoWindow.open(_this.map, marker);
            _this.presentPrompt();
        });
    };
    GamePage.prototype.presentPrompt = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Actions',
            // let bt_text = "";
            // if(player_role == ){
            // }
            buttons: [
                {
                    text: 'Cure',
                    handler: function (data) {
                        var user_id = "Tom";
                        _this.cure(user_id, "red", 5);
                    }
                },
                {
                    text: 'Move',
                    handler: function (data) {
                        var user_id = "Tom";
                        _this.move(user_id, _this.currentCord);
                    }
                },
                {
                    text: 'Build Research Center',
                    handler: function (data) {
                        var user_id = "Tom";
                        // this.build_researh_center(user_id, this.currentCord);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        _this.isMove = false;
                        console.log('Cancel');
                    }
                },
            ]
        });
        alert.present();
    };
    GamePage.prototype.movePrompt = function (marker) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Move to new place',
            // let bt_text = "";
            // if(player_role == ){
            // }
            buttons: [
                {
                    text: this.isMove == true ? 'Move Here' : 'Move',
                    handler: function (data) {
                        var user_id = "1";
                        _this.currentCord[0] = marker.getPosition().lat();
                        _this.currentCord[1] = marker.getPosition().lng();
                        _this.move(user_id, _this.currentCord);
                    }
                },
                {
                    text: this.isMove == true ? 'Cancel Move' : 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        _this.isMove = false;
                        console.log('Cancel');
                    }
                },
            ]
        });
        alert.present();
    };
    GamePage.prototype.cure = function (userId, diseaseType, noofCubes) {
        // let data:  Map<string, string> = new Map<string, string>();
        // data.set("user_id",userId);
        // data.set("disease_type",userId);
        // data.set("noofCuber",userId);
        // data.set("userLat",this.currentCord[0].toString());
        // data.set("userLong",this.currentCord[1].toString());
        var x = {
            "type": "treat",
            "location": {
                "x": this.currentCord[0].toString(),
                "y": this.currentCord[1].toString()
            },
            "player_id": userId,
            "game_id": 1,
            "disease": diseaseType
        };
        var response = this.restApi.post_game_data(x, "/action");
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
    };
    GamePage.prototype.move = function (user_id, locationCords) {
        if (!this.isMove) {
            this.isMove = true;
            this.showToastMessage("select destination");
        }
        else {
            var x = {
                "type": "move",
                "location": {
                    "x": this.currentCord[0].toString(),
                    "y": this.currentCord[1].toString()
                },
                "player_id": user_id,
                "game_id": "1",
                "disease": ""
            };
            this.restApi.put_game_data(x, "/action");
            this.isMove = false;
            this.ionViewDidLoad();
        }
    };
    GamePage.prototype.build = function (building_type) {
    };
    GamePage.prototype.getPosition = function (position) {
        var _this = this;
        var cord = [];
        this.currentCord.push(position.coords.latitude);
        this.currentCord.push(position.coords.longitude);
        //  this.currentCord = cord;
        setTimeout(function (handler) {
            console.log(_this.currentCord[0]);
            console.log(_this.currentCord[1]);
        }, 300);
    };
    GamePage.prototype.showToastMessage = function (info) {
        var toast = this.toastCtrl.create({
            message: info,
            duration: 3000
        });
        toast.present();
    };
    return GamePage;
}());
__decorate([
    ViewChild('map'),
    __metadata("design:type", ElementRef)
], GamePage.prototype, "mapElement", void 0);
GamePage = __decorate([
    Component({
        selector: 'page-game',
        templateUrl: 'game.html',
        providers: [GlobalVariables, RestApiProvider]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        GlobalVariables,
        ToastController,
        AlertController,
        Geolocation,
        RestApiProvider,
        LocalstorageProvider])
], GamePage);
export { GamePage };
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
//# sourceMappingURL=game.js.map