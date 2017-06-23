import { Injectable } from '@angular/core';
import { Http, Response,Headers, RequestOptions,RequestOptionsArgs,ResponseContentType } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class GameService {
    // private heroesUrl = 'api/heroes';  // URL to web API
    // private _gameApiUrl: string = 'https://mysterious-sands-48154.herokuapp.com/';  // URL to web API
    private _gameApiUrl: string = 'assets/data/game.data.json';  // URL to web API
     private _headers: Headers;
    private _options: RequestOptions;

    constructor(private http: Http) {
        console.log("game service starts");
        this._headers = new Headers({ 'Content-Type': 'application/json' });
        
        this._options = new RequestOptions({ headers: this._headers });
    }

    gameRequest() {
         this.http.get(this._gameApiUrl,this._options).subscribe(response => console.log(response));
    }

    // private extractData(res: Response) {
    //     let body = res.json();
    //     return body.data || {};
    // } 

    // private handleError(error: Response | any) {
    //     // In a real world app, you might use a remote logging infrastructure
    //     let errMsg: string;
    //     if (error instanceof Response) {
    //         const body = error.json() || '';
    //         const err = body.error || JSON.stringify(body);
    //         errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    //     } else {
    //         errMsg = error.message ? error.message : error.toString();
    //     }
    //     console.error(errMsg);
    //     return Observable.throw(errMsg);
    // }
}



class ApiRequestHeader implements RequestOptionsArgs{

  url: string;
  method: string;
  search: string;
  params: string;l
  headers:Headers;// = new Headers({ 'Content-Type': 'application/json' });
  body: any;
  withCredentials: boolean;
  responseType: ResponseContentType;


constructor(){



}


//   url: string|null
//   method: string|RequestMethod|null
//   search: string|URLSearchParams|{[key: string]: any | any[]}|null
//   params: string|URLSearchParams|{[key: string]: any | any[]}|null
//   headers = new Headers({ 'Content-Type': 'application/json' });
//   body: any
//   withCredentials: boolean|null
//   responseType: ResponseContentType|null


}