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
var IndicatorsPage = (function () {
    function IndicatorsPage(navCtrl, navParams, restApi) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restApi = restApi;
        this.game_rule_data = '';
        this.outbreak_marker = '';
        this.infection_rate = '';
        this.action_count = '';
    }
    IndicatorsPage.prototype.ionViewDidLoad = function () {
        this.loadData();
    };
    IndicatorsPage.prototype.loadData = function () {
        var _this = this;
        this.restApi.get_game_data("1").then(function (result) {
            var game = result['game'];
            _this.game_rule_data = game.indicators;
            _this.outbreak_marker = _this.game_rule_data.outbreak_marker;
            _this.infection_rate = _this.game_rule_data.infection_rate;
            _this.action_count = _this.game_rule_data.action_count;
        }, function (err) {
            console.log("data failed 1");
        });
    };
    return IndicatorsPage;
}());
IndicatorsPage = __decorate([
    Component({
        selector: 'page-indicators',
        templateUrl: 'indicators.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, RestApiProvider])
], IndicatorsPage);
export { IndicatorsPage };
//# sourceMappingURL=indicators.js.map