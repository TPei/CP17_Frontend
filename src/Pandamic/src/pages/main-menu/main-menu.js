var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { RuleBookPage } from '../rule-book/rule-book';
import { OptionsPage } from '../options/options';
import { SignUpPage } from '../sign-up/sign-up';
import { CreateGamePage } from '../create-game/create-game';
import { AddPlayerPage } from '../add-player/add-player';
import { GamePage } from '../game/game';
import { JoinGamePage } from '../join-game/join-game';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { LocalstorageProvider } from '../../providers/localstorage/localstorage';
import { Geolocation } from '@ionic-native/geolocation';
import { Game_Constants } from '../../providers/Game_Constants/gameconstants';
var MainMenuPage = (function () {
    function MainMenuPage(navCtrl, restApiProvider, toastCtrl, alertCtrl, localStr, geolocation) {
        this.navCtrl = navCtrl;
        this.restApiProvider = restApiProvider;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.localStr = localStr;
        this.geolocation = geolocation;
        this.json_data = '';
        this.player_current_location_lat = "";
        this.player_current_location_long = "";
        this.get_player_location();
        this.game_get_data();
    }
    MainMenuPage.prototype.create_Player = function () {
        var _this = this;
        //For Local Storage testing
        this.localStr.get_data(Game_Constants.player_name_string).then(function (val) {
            if (val == null || val == '') {
                var player_id = _this.generateUUID();
                var data = { game_id: "1", player_id: player_id.toString(), location: {
                        x: _this.player_current_location_lat.toString(),
                        y: _this.player_current_location_long.toString()
                    }
                };
                _this.restApiProvider.post_player_data(data).then(function (result) {
                    _this.localStr.save_data(Game_Constants.player_name_string, player_id);
                    _this.showToastMessage("Player is Created");
                    _this.game_get_data();
                }, function (err) {
                    _this.showToastMessage("Some Issue with API or Internet");
                });
            }
            else {
                _this.showToastMessage("Welcome Back : " + val);
            }
        });
    };
    //Generate and Unique ID key will be use as player user name
    MainMenuPage.prototype.generateUUID = function () {
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    };
    MainMenuPage.prototype.get_player_location = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (position) {
            _this.player_current_location_lat = position.coords.latitude;
            _this.player_current_location_long = position.coords.longitude;
        }, function (err) {
            console.log(err);
        });
        this.game_get_data();
    };
    MainMenuPage.prototype.game_get_data = function () {
        var _this = this;
        this.restApiProvider.get_game_data(Game_Constants.DEFAULT_GAME_ID).then(function (result) {
            _this.json_data = result;
        }, function (err) {
            console.log("data failed 1");
        });
    };
    MainMenuPage.prototype.showToastMessage = function (info) {
        var toast = this.toastCtrl.create({
            message: info,
            duration: 3000
        });
        toast.present();
    };
    MainMenuPage.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Low battery',
            subTitle: '10% of battery remaining',
            buttons: ['Dismiss']
        });
        alert.present();
    };
    MainMenuPage.prototype.goToRuleBook = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(RuleBookPage);
    };
    MainMenuPage.prototype.goToOptions = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(OptionsPage);
    };
    MainMenuPage.prototype.goToLogin = function (params) {
        if (!params)
            params = {};
        // this.navCtrl.push(LoginPage);
        //  this.showToastMessage('Data is Not Availble Either check or internet or Server is not working');
        //this.showAlert();
        //After the Player Location Create the Player  
        this.create_Player();
        this.navCtrl.push(JoinGamePage, this.json_data);
    };
    MainMenuPage.prototype.goToSignUp = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(SignUpPage);
    };
    MainMenuPage.prototype.goToCreateGame = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(CreateGamePage);
    };
    MainMenuPage.prototype.goToAddPlayer = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(AddPlayerPage);
    };
    MainMenuPage.prototype.goToGame = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(GamePage, this.json_data);
    };
    MainMenuPage.prototype.goToJoinGame = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(JoinGamePage);
    };
    return MainMenuPage;
}());
MainMenuPage = __decorate([
    Component({
        selector: 'page-main-menu',
        templateUrl: 'main-menu.html'
    }),
    __metadata("design:paramtypes", [NavController,
        RestApiProvider,
        ToastController,
        AlertController,
        LocalstorageProvider,
        Geolocation])
], MainMenuPage);
export { MainMenuPage };
//# sourceMappingURL=main-menu.js.map