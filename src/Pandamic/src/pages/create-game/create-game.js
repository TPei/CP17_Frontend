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
import { AddPlayerPage } from '../add-player/add-player';
import { GamePage } from '../game/game';
import { JoinGamePage } from '../join-game/join-game';
var CreateGamePage = (function () {
    function CreateGamePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    CreateGamePage.prototype.goToAddPlayer = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(AddPlayerPage);
    };
    CreateGamePage.prototype.goToGame = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(GamePage);
    };
    CreateGamePage.prototype.goToJoinGame = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(JoinGamePage);
    };
    return CreateGamePage;
}());
CreateGamePage = __decorate([
    Component({
        selector: 'page-create-game',
        templateUrl: 'create-game.html'
    }),
    __metadata("design:paramtypes", [NavController])
], CreateGamePage);
export { CreateGamePage };
//# sourceMappingURL=create-game.js.map