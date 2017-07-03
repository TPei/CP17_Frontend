import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestApiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

//  let apiUrl = 'assets/data/game.data.json';
// let apiUrl = 'https://mysterious-sands-48154.herokuapp.com';
 let apiUrl = 'http://sample-env.mucpcmwpvj.eu-central-1.elasticbeanstalk.com';

@Injectable()
export class RestApiProvider {
  
  constructor(public http: Http) {
      this.get_game_data();
  }


  get_game_data() {
    return new Promise((resolve, reject) => {
        this.http.get(apiUrl+"/game?id=1" )
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  post_game_data(input_data:any,post_location) {

    // input = input_data.json();

    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(apiUrl+"/game"+post_location ,input_data)
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }
}
