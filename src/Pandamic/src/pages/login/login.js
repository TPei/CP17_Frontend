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
import { NavController } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { CreateGamePage } from '../create-game/create-game';
import { AddPlayerPage } from '../add-player/add-player';
import { GamePage } from '../game/game';
import { JoinGamePage } from '../join-game/join-game';
var LoginPage = LoginPage_1 = (function () {
    function LoginPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    LoginPage.prototype.goToSignUp = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(SignUpPage);
    };
    LoginPage.prototype.goToLogin = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(LoginPage_1);
    };
    LoginPage.prototype.goToCreateGame = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(CreateGamePage);
    };
    LoginPage.prototype.goToAddPlayer = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(AddPlayerPage);
    };
    LoginPage.prototype.goToGame = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(GamePage);
    };
    LoginPage.prototype.goToJoinGame = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(JoinGamePage);
    };
    return LoginPage;
}());
LoginPage = LoginPage_1 = __decorate([
    Component({
        selector: 'page-login',
        templateUrl: 'login.html'
    }),
    __metadata("design:paramtypes", [NavController])
], LoginPage);
export { LoginPage };
var LoginPage_1;
//# sourceMappingURL=login.js.map