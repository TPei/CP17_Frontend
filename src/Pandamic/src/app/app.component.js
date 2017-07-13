var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MainMenuPage } from '../pages/main-menu/main-menu';
import { GameRulesPage } from '../pages/game-rules/game-rules';
import { DiseasesPage } from '../pages/diseases/diseases';
import { IndicatorsPage } from '../pages/indicators/indicators';
import { PlayerPage } from '../pages/player/player';
import { RestApiProvider } from '../providers/rest-api/rest-api';
import { PandemicChat } from '../pages/pandemic-chat/pandemic-chat';
import { Platform, Nav, ModalController } from 'ionic-angular';
import { LocalstorageProvider } from '../providers/localstorage/localstorage';
import { Game_Constants } from '../providers/Game_Constants/gameconstants';
import * as firebase from 'firebase';
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, restApiProvider, modalCtrl, localStr) {
        var _this = this;
        this.restApiProvider = restApiProvider;
        this.modalCtrl = modalCtrl;
        this.localStr = localStr;
        this.rootPage = MainMenuPage;
        this.jsonReult = '';
        this.game_id = '';
        this.user_id = '';
        this.player_location_data = '';
        this.Token_Data = '';
        this.default_player_name = '';
        var config = {
            apiKey: Game_Constants.FIREBASE_API_KEY,
            authDomain: Game_Constants.FIREBASE_AUTH_URL,
            databaseURL: Game_Constants.FIREBASE_DB_URL,
            projectId: Game_Constants.FIREBASE_PROJECT_ID,
            storageBucket: Game_Constants.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: Game_Constants.FIREBASE_MESSAGE_SENDER_ID
        };
        firebase.initializeApp(config);
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        if (!Game_Constants.APP_FORCE_START) {
            this.localStr.get_data(Game_Constants.player_name_string).then(function (val) {
                _this.default_player_name = val;
            });
        }
        else {
            this.default_player_name = 'DefaultPlayer';
        }
        this.game_get_data();
    }
    MyApp.prototype.initiateChat = function () {
        this.modalCtrl.create(PandemicChat).present();
    };
    MyApp.prototype.game_get_data = function () {
        var _this = this;
        this.restApiProvider.get_game_data("1").then(function (result) {
            _this.jsonReult = result;
            _this.game_id = _this.jsonReult.game.game_id;
            _this.player_location_data = _this.jsonReult.game.player;
            _this.user_id = _this.localStr.get_data(Game_Constants.player_name_string);
            localStorage['game_id'] = _this.game_id;
            localStorage['user_id'] = _this.user_id;
            _this.TokenCount();
        }, function (err) {
            // console.log("data failed 1");
        });
    };
    MyApp.prototype.TokenCount = function () {
        for (var _i = 0; _i < this.player_location_data.length; _i++) {
            if (this.player_location_data[_i].name == this.default_player_name) {
                for (var _k = 0; _k < this.player_location_data[_i].tokens.disease_tokens.length; _k++) {
                    this.Token_Data = this.Token_Data + " " + this.player_location_data[_i].tokens.disease_tokens[_k].color + " : "
                        + this.player_location_data[_i].tokens.disease_tokens[_k].count;
                    console.log("Coloer : " + this.player_location_data[_i].tokens.disease_tokens[_k].color);
                }
            }
        }
    };
    MyApp.prototype.gotogamerules = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(GameRulesPage, this.jsonReult.game);
    };
    MyApp.prototype.Diseases = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(DiseasesPage, this.jsonReult.game);
    };
    MyApp.prototype.Indicators = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(IndicatorsPage, this.jsonReult.game);
    };
    MyApp.prototype.Player = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(PlayerPage, this.jsonReult.game);
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "navCtrl", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform, StatusBar, SplashScreen, RestApiProvider, ModalController, LocalstorageProvider])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map