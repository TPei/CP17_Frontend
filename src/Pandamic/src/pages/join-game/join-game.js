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
import { NavController, NavParams } from 'ionic-angular';
import { GamePage } from '../game/game';
var JoinGamePage = (function () {
    function JoinGamePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.game_data = '';
        this.game_id = [];
    }
    JoinGamePage.prototype.goToGame = function (params) {
        if (!params)
            params = {};
        this.navCtrl.push(GamePage, this.game_data);
    };
    JoinGamePage.prototype.ionViewDidLoad = function () {
        this.game_data = this.navParams.get('game');
        this.game_id = this.game_data.game_id;
    };
    return JoinGamePage;
}());
JoinGamePage = __decorate([
    Component({
        selector: 'page-join-game',
        templateUrl: 'join-game.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams])
], JoinGamePage);
export { JoinGamePage };
//# sourceMappingURL=join-game.js.map