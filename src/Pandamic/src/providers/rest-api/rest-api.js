var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import {plainToClass} from "class-transformer";
import { Game_Constants } from '../../providers/Game_Constants/gameconstants';
var RestApiProvider = (function () {
    function RestApiProvider(http) {
        this.http = http;
        this.Game_Data = '';
        this.get_game_data(Game_Constants.DEFAULT_GAME_ID);
    }
    RestApiProvider.prototype.get_game_data = function (game_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(Game_Constants.API_URL + "/game?id=" + game_id)
                .subscribe(function (res) {
                resolve(res.json());
                // this.Game_Data = plainToClass(RootObject,res.json());
            }, function (err) {
            }, function () {
                console.log("catch");
            });
        });
    };
    RestApiProvider.prototype.post_game_data = function (input_data, post_location) {
        return new Promise((resolve, resolve(res.json())));
        {
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.http.post(Game_Constants.API_URL + "/game" + post_location, input_data)
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                resolve(res.json());
            }, function () {
                console.log("catch");
            });
        }
        ;
    };
    RestApiProvider.prototype.put_game_data = function (input_data, post_location) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            console.log('in post');
            console.log(input_data);
            _this.http.put(Game_Constants.API_URL + "/game" + post_location, headers, input_data)
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                console.log("err" + err);
            });
        });
    };
    RestApiProvider.prototype.post_player_data = function (input_data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            _this.http.post(Game_Constants.API_URL + "/game/player", headers, input_data)
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                console.log("err" + err);
            });
        });
    };
    return RestApiProvider;
}());
RestApiProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], RestApiProvider);
export { RestApiProvider };
var RootObject = (function () {
    function RootObject() {
    }
    return RootObject;
}());
export { RootObject };
//# sourceMappingURL=rest-api.js.map