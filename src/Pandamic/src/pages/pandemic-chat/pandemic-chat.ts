import { Component,ViewChild } from '@angular/core';
import { NavController, ViewController, NavParams, Content } from 'ionic-angular';
import * as firebase from 'firebase';

@Component({
  selector: 'page-pandemic-chat',
  templateUrl: 'pandemic-chat.html',
})

export class PandemicChat {
  @ViewChild(Content) content: Content;
  ref;
  storage;
  name;
  newmessage;
  messagesList;
  gameId;
  userid;
  // photoURL;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.gameId=localStorage['game_id'];
    this.ref = firebase.database().ref('rooms/'+this.gameId+"/messages");
    this.ref.off();
    this.storage = firebase.storage();
    this.userid = localStorage['user_id'];
    // this.photoURL = '/assets/img/profile_placeholder.png';
    console.log(this.userid);
  }

  scrollChatToBottom(){
    this.content.scrollToBottom(200);
  };

  ionViewDidLoad(){
    this.ref.on('value',data => {
      this.scrollChatToBottom();
      let tmp = [];
      data.forEach( data => {
        tmp.push({
          key: data.key,
          name: data.val().name,
          text: data.val().text,
        })
      });
      this.messagesList = tmp;
    });
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  send(){
    // Check that the user entered a message and is signed in.
    if (this.newmessage) {
      // Add a new message entry to the Firebase Database.
      this.ref.push({
        name: this.userid,
        text: this.newmessage,
        // photoUrl: this.photoURL
      }).then(function() {
        //console.log("********");
        this.newmessage = '';
        this.scrollChatToBottom();
        }.bind(this)).catch(function(error) {
        console.error('Error writing new message to Firebase Database', error);
      });
    }
  }
}