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
import { Platform, Nav, AlertController } from 'ionic-angular';
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, restApiProvider, alertCtrl) {
        this.restApiProvider = restApiProvider;
        this.alertCtrl = alertCtrl;
        this.rootPage = MainMenuPage;
        this.jsonReult = '';
        this.game_id = '';
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        this.game_get_data();
    }
    MyApp.prototype.game_get_data = function () {
        var _this = this;
        this.restApiProvider.get_game_data("1").then(function (result) {
            _this.jsonReult = result;
            _this.game_id = _this.jsonReult.game.game_id;
            console.log("game id is :" + _this.game_id);
        }, function (err) {
            console.log("data failed 1");
        });
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
    MyApp.prototype.onClick1 = function (params) {
        if (!params)
            params = {};
        this.popPrompt();
    };
    MyApp.prototype.onClick2 = function (params) {
        if (!params)
            params = {};
        this.popPrompt();
    };
    MyApp.prototype.onClick3 = function (params) {
        if (!params)
            params = {};
        this.popPrompt();
    };
    MyApp.prototype.onClick4 = function (params) {
        if (!params)
            params = {};
        this.popPrompt();
    };
    MyApp.prototype.popPrompt = function () {
        var alert = this.alertCtrl.create({
            title: 'Actions',
            buttons: [
                {
                    text: 'Cure',
                    handler: function (data) {
                    }
                },
            ]
        });
        alert.present();
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
    __metadata("design:paramtypes", [Platform, StatusBar, SplashScreen, RestApiProvider, AlertController])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map