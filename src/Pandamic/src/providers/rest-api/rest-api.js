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
/*
  Generated class for the RestApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
// let apiUrl = 'assets/dummy.json';
// let apiUrl = 'https://mysterious-sands-48154.herokuapp.com';
var apiUrl = 'http://sample-env.mucpcmwpvj.eu-central-1.elasticbeanstalk.com';
var RestApiProvider = (function () {
    function RestApiProvider(http) {
        this.http = http;
        this.get_game_data("1");
    }
    RestApiProvider.prototype.get_game_data = function (game_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(apiUrl + "/game?id=" + game_id)
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            }, function () {
                console.log("catch");
            });
        });
    };
    RestApiProvider.prototype.post_game_data = function (input_data, post_location) {
        // input = input_data.json();
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            _this.http.post(apiUrl + "/game" + post_location, input_data)
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            }, function () {
                console.log("catch");
            });
        });
    };
    RestApiProvider.prototype.put_game_data = function (input_data, post_location) {
        // input = input_data.json();
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            _this.http.put(apiUrl + "/game" + post_location, input_data)
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            }, function () {
                console.log("catch");
            });
        });
    };
    RestApiProvider.prototype.post_player_data = function (input_data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            _this.http.post(apiUrl + "/game/player", input_data)
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
                console.log("err" + err);
            }, function () {
                console.log("catch on post player");
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
//# sourceMappingURL=rest-api.js.map