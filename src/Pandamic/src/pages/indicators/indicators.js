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
var IndicatorsPage = (function () {
    function IndicatorsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.game_rule_data = '';
        this.outbreak_marker = '';
        this.infection_rate = '';
        this.action_count = '';
    }
    IndicatorsPage.prototype.ionViewDidLoad = function () {
        this.game_rule_data = this.navParams.get('indicators');
        this.outbreak_marker = this.game_rule_data.outbreak_marker;
        this.infection_rate = this.game_rule_data.infection_rate;
        this.action_count = this.game_rule_data.action_count;
    };
    return IndicatorsPage;
}());
IndicatorsPage = __decorate([
    Component({
        selector: 'page-indicators',
        templateUrl: 'indicators.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams])
], IndicatorsPage);
export { IndicatorsPage };
//# sourceMappingURL=indicators.js.map