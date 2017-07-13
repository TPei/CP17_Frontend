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
import { GlobalVariables } from './map-styles';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LocalstorageProvider } from '../../providers/localstorage/localstorage';
import { Game_Constants } from '../../providers/Game_Constants/gameconstants';
import { MainMenuPage } from '../main-menu/main-menu';
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
        this.dieaseMarkerDistance = 20;
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
        this.refresh_map = '';
        this.playerMarker = '';
        this.styles = globalVariables.styles;
        if (!Game_Constants.APP_FORCE_START) {
            this.localStr.get_data(Game_Constants.player_name_string).then(function (val) {
                _this.default_player_name = val;
            });
        }
        else {
            this.default_player_name = 'DefaultPlayer';
        }
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
            _this.loadMap();
            _this.addMarkers();
            _this.addOtherPlayersMarkers();
            _this.addMainPlayer();
            _this.fetchMarkers();
            _this.connectMarkers();
        }, function (err) {
            _this.showToastMessage("Problem in fetching Player Position");
        });
    };
    GamePage.prototype.refresh_game_data = function () {
        var _this = this;
        var game = '';
        this.restApi.get_game_data(Game_Constants.DEFAULT_GAME_ID).then(function (result) {
            game = result['game'];
            _this.game_data = game.map;
            _this.player_location_data = game.player;
            _this.locations = _this.game_data.locations;
            if (Game_Constants.APP_FORCE_START) {
                _this.gamewin_loose(game);
            }
        }, function (err) {
            _this.showToastMessage("Error in API or Internet Not working");
        });
    };
    GamePage.prototype.gamewin_loose = function (game) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: game.won == true ? 'You Won The Game.' : 'You Loose The Game.',
            buttons: [
                {
                    text: 'Go Back Home',
                    role: 'Go Back Home',
                    handler: function (data) {
                        _this.navCtrl.push(MainMenuPage);
                    }
                },
                {
                    text: 'cancel',
                    role: 'cancel',
                    handler: function (data) {
                    }
                },
            ]
        });
        alert.present();
    };
    //Add the disease markers in the google map
    GamePage.prototype.addMarkers = function () {
        for (var _i = 0; _i < this.locations.length; _i++) {
            this.addMarker(this.locations[_i].latitude, this.locations[_i].longitude, this.locations[_i].alias, this.locations[_i].color, this.locations[_i].research_building, this.locations[_i].cubes);
        }
    };
    GamePage.prototype.addMainPlayer = function () {
        var _this = this;
        for (var _i = 0; _i < this.player_location_data.length; _i++) {
            var default_player = '/assets/img/default_player.png';
            if (this.player_location_data[_i].name == this.default_player_name) {
                this.playerMarker = new google.maps.Marker({
                    map: this.map,
                    animation: google.maps.Animation.DROP,
                    position: new google.maps.LatLng(this.currentCord[0], this.currentCord[1]),
                    icon: default_player
                });
                this.add_player_informations(this.playerMarker, this.player_location_data[_i].name);
                setInterval(function () { _this.refreshPlayerLocation(); }, 100);
            }
        }
    };
    GamePage.prototype.refreshPlayerLocation = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (position) {
            _this.currentCord[0] = position.coords.latitude;
            _this.currentCord[1] = position.coords.longitude;
            _this.playerMarker.position = new google.maps.LatLng(_this.currentCord[0], _this.currentCord[1]);
            _this.playerMarker.center = new google.maps.LatLng(_this.currentCord[0], _this.currentCord[1]);
        }, function (err) {
            console.log(err);
        });
    };
    GamePage.prototype.addOtherPlayersMarkers = function () {
        for (var _i = 0; _i < this.player_location_data.length; _i++) {
            var player_img = '/assets/img/Doctor-icon.png';
            if (this.player_location_data[_i].name != this.default_player_name) {
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
    //Load the map and initialized with a mid value
    GamePage.prototype.loadMap = function () {
        // console.log(this.location);
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
        var location_img = "/assets/img/map-marker-icon.png";
        var research_centre_img = "/assets/img/office-building-icon.png";
        var marker = new google.maps.Marker({
            map: this.map,
            // animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(lattitue, longitute),
            icon: location_img
        });
        var _alias = alias;
        // console.log(Number(Number(lattitue)+50));
        if (research_building) {
            var arr = this.modifiedLatLng(lattitue, longitute);
            marker = new google.maps.Marker({
                map: this.map,
                // animation: google.maps.Animation.DROP,
                position: new google.maps.LatLng(arr[0], arr[1]),
                icon: research_centre_img
            });
            // this.add_Research_Controller(research_marker,"Research Center");
        }
        this.addDiseaseMarkers(lattitue, longitute, cube_info);
        this.addController(marker, _alias, color, cube_info);
    };
    GamePage.prototype.modifiedLatLng = function (lat, lng) {
        var decPart_lat = (lat + "").split(".");
        var disease_lat = 0;
        var decPart_lng = (lng + "").split(".");
        var disease_lng = 0;
        this.dieaseMarkerDistance = 300;
        var coor = [];
        coor.push(Number(decPart_lat[0] + "." + Number(Number(decPart_lat[1]) + this.dieaseMarkerDistance)));
        coor.push(Number(decPart_lng[0] + "." + Number(Number(decPart_lng[1]) + this.dieaseMarkerDistance)));
        return coor;
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
        // console.log("disease marker");
        var _this = this;
        var decPart_lat = (lat + "").split(".");
        var disease_lat = 0;
        var decPart_lng = (lng + "").split(".");
        var disease_lng = 0;
        var img = "";
        // console.log(cubeInfo);
        cubeInfo.forEach(function (element) {
            if (element.count <= 0) {
                return;
            }
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
                //  img = '/assets/img/MapMarker_Ball__Black.png';
                img = '/assets/img/MapMarker_Ball_Black2.png';
                disease_lat = Number(decPart_lat[0] + "." + Number(Number(decPart_lat[1]) - _this.dieaseMarkerDistance));
                disease_lng = Number(decPart_lng[0] + "." + Number(Number(decPart_lng[1]) + _this.dieaseMarkerDistance));
            }
            else if (element.color == "green") {
                img = "/assets/img/Map-Marker-Ball-Chartreuse.png";
                disease_lat = Number(decPart_lat[0] + "." + Number(Number(decPart_lat[1]) - _this.dieaseMarkerDistance));
                disease_lng = Number(decPart_lng[0] + "." + Number(Number(decPart_lng[1]) - _this.dieaseMarkerDistance));
            }
            // console.log("disease marker2");
            // let player_img = 'https://cdn.wikimg.net/strategywiki/images/3/33/Athena_player_sprite.png';
            var marker = new google.maps.Marker({
                map: _this.map,
                // animation: google.maps.Animation.DROP,
                position: new google.maps.LatLng(disease_lat, disease_lng),
                icon: img,
                customInfo: element.color
            });
            var infoWindow = new google.maps.InfoWindow({
                content: 'cube count: ' + element.count
            });
            google.maps.event.addListener(marker, 'click', function () {
                // infoWindow.open(this.map, marker);
                _this.treatmentPrompt(marker, 'cube count: ' + element.count);
            });
        });
    };
    //Add control and cube informations 
    GamePage.prototype.addController = function (marker, content, color, cube_info) {
        var _this = this;
        //  console.log("cube data : "+ JSON.stringify(cube_info));
        var infoWindow = new google.maps.InfoWindow({
            content: 'Location : ' + content + '\n' + 'Color : ' + color
        });
        google.maps.event.addListener(marker, 'click', function () {
            // console.log("1");
            // infoWindow.open(this.map, marker);
            if (!_this.isMove) {
                _this.presentPrompt(marker, 'Location : ' + content, 'Color : ' + color);
            }
            else {
                _this.movePrompt(marker);
            }
        });
    };
    GamePage.prototype.add_Research_Controller = function (marker, content) {
        var _this = this;
        var infoWindow = new google.maps.InfoWindow({
            content: 'Location : ' + content
        });
        google.maps.event.addListener(marker, 'click', function () {
            // console.log("2");
            // infoWindow.open(this.map, marker);
            _this.presentPrompt(marker, 'Location : ' + content, "");
            // 
        });
    };
    GamePage.prototype.add_player_informations = function (marker, content) {
        var _this = this;
        var infoWindow = new google.maps.InfoWindow({
            content: 'this is : ' + content
        });
        google.maps.event.addListener(marker, 'click', function () {
            // console.log("3");
            // infoWindow.open(this.map, marker);
            _this.presentPrompt(marker, 'this is : ' + content, "");
        });
    };
    GamePage.prototype.presentPrompt = function (marker, info, message) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Actions',
            subTitle: info,
            message: message,
            buttons: [
                {
                    text: 'Cure',
                    handler: function (data) {
                        var user_id = _this.default_player_name;
                        _this.cure_treat('cure', user_id, marker['customInfo'], 5);
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
                    handler: function (data) {
                        var user_id = _this.default_player_name;
                        _this.build(user_id, _this.currentCord);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        _this.isMove = false;
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
            buttons: [
                {
                    text: this.isMove == true ? 'Move Here' : 'Move',
                    handler: function (data) {
                        var user_id = _this.default_player_name;
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
                    }
                },
            ]
        });
        alert.present();
    };
    GamePage.prototype.treatmentPrompt = function (marker, info) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Treat the cure',
            subTitle: info,
            buttons: [
                {
                    text: 'Cure',
                    handler: function (data) {
                        var user_id = _this.default_player_name;
                        _this.cure_treat("cure", user_id, marker['customInfo'], 1);
                    }
                },
                {
                    text: 'Treat',
                    handler: function (data) {
                        var user_id = _this.default_player_name;
                        console.log(marker['customInfo']);
                        _this.cure_treat("treat", user_id, marker['customInfo'], 1);
                    }
                },
                {
                    text: this.isMove == true ? 'Cancel Move' : 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        _this.isMove = false;
                        // console.log('Cancel');
                    }
                },
            ]
        });
        alert.present();
    };
    GamePage.prototype.cure_treat = function (type, userId, diseaseType, noofCubes) {
        var response = this.restApi.post_game_data(this.dataForCureMoveBuild(type, userId, this.currentCord, Game_Constants.DEFAULT_GAME_ID, diseaseType), "/action")
            .then(function (result) {
            console.log("result is :" + result);
        }, function (err) {
            console.log("error is :" + err);
        });
        console.log("response is :" + JSON.stringify(response));
        this.refresh_game_data();
    };
    GamePage.prototype.dataForCureMoveBuild = function (type, user_id, coord, game_id, disease_color) {
        var x = {
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
    };
    GamePage.prototype.move = function (user_id, locationCords) {
        var _this = this;
        if (!this.isMove) {
            this.isMove = true;
            this.showToastMessage("select destination");
        }
        else {
            this.restApi.put_game_data(this.dataForCureMoveBuild("move", user_id, this.currentCord, Game_Constants.DEFAULT_GAME_ID, ""), "/action")
                .then(function (result) {
                var response = result['data'];
                if (response.success) {
                    _this.showToastMessage("Movement Successful");
                }
                else {
                    _this.showToastMessage("Movement Failed");
                }
            }, function (err) {
                _this.showToastMessage("Error in API or Internet Not working");
            });
            this.isMove = false;
            this.refresh_game_data();
        }
    };
    GamePage.prototype.build = function (user_id, building_type) {
        var _this = this;
        this.restApi.post_game_data(this.dataForCureMoveBuild("build_research", user_id, this.currentCord, Game_Constants.DEFAULT_GAME_ID, ""), "/action")
            .then(function (result) {
            console.log("build Result" + JSON.stringify(result));
        }, function (err) {
            _this.showToastMessage("Error in API or Internet Not working");
        });
        this.isMove = false;
        this.refresh_game_data();
    };
    GamePage.prototype.getPosition = function (position) {
        var cord = [];
        this.currentCord.push(position.coords.latitude);
        this.currentCord.push(position.coords.longitude);
        //  this.currentCord = cord;
        setTimeout(function (handler) {
            // console.log(this.currentCord[0]);
            // console.log(this.currentCord[1]);
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
//# sourceMappingURL=game.js.map