var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, ViewController, NavParams, Content } from 'ionic-angular';
import * as firebase from 'firebase';
var PandemicChat = (function () {
    // photoURL;
    function PandemicChat(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.gameId = localStorage['game_id'];
        this.ref = firebase.database().ref('rooms/' + this.gameId + "/messages");
        this.ref.off();
        this.storage = firebase.storage();
        this.userid = localStorage['user_id'];
        // this.photoURL = '/assets/img/profile_placeholder.png';
        console.log(this.userid);
    }
    PandemicChat.prototype.scrollChatToBottom = function () {
        this.content.scrollToBottom(200);
    };
    ;
    PandemicChat.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.ref.on('value', function (data) {
            _this.scrollChatToBottom();
            var tmp = [];
            data.forEach(function (data) {
                tmp.push({
                    key: data.key,
                    name: data.val().name,
                    text: data.val().text,
                });
            });
            _this.messagesList = tmp;
        });
    };
    PandemicChat.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    PandemicChat.prototype.send = function () {
        // Check that the user entered a message and is signed in.
        if (this.newmessage) {
            // Add a new message entry to the Firebase Database.
            this.ref.push({
                name: this.userid,
                text: this.newmessage,
            }).then(function () {
                console.log("********");
                this.newmessage = '';
                this.scrollChatToBottom();
            }.bind(this)).catch(function (error) {
                console.error('Error writing new message to Firebase Database', error);
            });
        }
    };
    return PandemicChat;
}());
__decorate([
    ViewChild(Content),
    __metadata("design:type", Content)
], PandemicChat.prototype, "content", void 0);
PandemicChat = __decorate([
    Component({
        selector: 'page-pandemic-chat',
        templateUrl: 'pandemic-chat.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ViewController])
], PandemicChat);
export { PandemicChat };
//# sourceMappingURL=pandemic-chat.js.map