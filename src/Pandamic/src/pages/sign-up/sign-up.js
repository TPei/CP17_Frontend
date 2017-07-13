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
import { LoginPage } from '../login/login';
import { CreateGamePage } from '../create-game/create-game';
import { AddPlayerPage } from '../add-player/add-player';
import { GamePage } from '../game/game';
import { JoinGamePage } from '../join-game/join-game';
var SignUpPage = SignUpPage_1 = (function () {
    function SignUpPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    SignUpPage.prototype.goToLogin = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(LoginPage);
    };
    SignUpPage.prototype.goToSignUp = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(SignUpPage_1);
    };
    SignUpPage.prototype.goToCreateGame = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(CreateGamePage);
    };
    SignUpPage.prototype.goToAddPlayer = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(AddPlayerPage);
    };
    SignUpPage.prototype.goToGame = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(GamePage);
    };
    SignUpPage.prototype.goToJoinGame = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(JoinGamePage);
    };
    return SignUpPage;
}());
SignUpPage = SignUpPage_1 = __decorate([
    Component({
        selector: 'page-sign-up',
        templateUrl: 'sign-up.html'
    }),
    __metadata("design:paramtypes", [NavController])
], SignUpPage);
export { SignUpPage };
var SignUpPage_1;
//# sourceMappingURL=sign-up.js.map