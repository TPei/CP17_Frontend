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
var GameRulesPage = (function () {
    function GameRulesPage(navCtrl, navParams, restApi) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.restApi = restApi;
        this.game_rule_data = '';
        this.max_action_count = '';
        this.cureAmount = '';
        this.locationProximity = '';
        this.outbreak_max_lvl = '';
        this.research_building_count = '';
        this.infection_lvl = '';
    }
    GameRulesPage.prototype.loadData = function () {
        var _this = this;
        this.restApi.get_game_data("1").then(function (result) {
            var game = result['game'];
            _this.game_rule_data = game.game_rules;
            _this.max_action_count = _this.game_rule_data.max_action_count;
            _this.cureAmount = _this.game_rule_data.cureAmount;
            _this.locationProximity = _this.game_rule_data.locationProximity;
            _this.outbreak_max_lvl = _this.game_rule_data.outbreak_max_lvl;
            _this.research_building_count = _this.game_rule_data.research_building_count;
            _this.infection_lvl = _this.game_rule_data.infection_lvl;
        }, function (err) {
            console.log("data failed 1");
        });
    };
    GameRulesPage.prototype.ionViewDidLoad = function () {
        this.loadData();
    };
    return GameRulesPage;
}());
GameRulesPage = __decorate([
    Component({
        selector: 'page-game-rules',
        templateUrl: 'game-rules.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, RestApiProvider])
], GameRulesPage);
export { GameRulesPage };
//# sourceMappingURL=game-rules.js.map