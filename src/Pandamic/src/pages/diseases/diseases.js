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
import { RestApiProvider } from '../../providers/rest-api/rest-api';
var DiseasesPage = (function () {
    function DiseasesPage(navCtrl, navParams, restApi) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restApi = restApi;
        this.diseases = '';
    }
    DiseasesPage.prototype.ionViewDidLoad = function () {
        this.loadData();
    };
    DiseasesPage.prototype.loadData = function () {
        var _this = this;
        this.restApi.get_game_data("1").then(function (result) {
            var game = result['game'];
            _this.diseases = game.diseases;
        }, function (err) {
            console.log("data failed 1");
        });
    };
    return DiseasesPage;
}());
DiseasesPage = __decorate([
    Component({
        selector: 'page-diseases',
        templateUrl: 'diseases.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, RestApiProvider])
], DiseasesPage);
export { DiseasesPage };
//# sourceMappingURL=diseases.js.map