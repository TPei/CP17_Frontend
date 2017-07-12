import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import {plainToClass} from "class-transformer";
import {Game_Constants} from '../../providers/Game_Constants/gameconstants';

@Injectable()
export class RestApiProvider {  

public Game_Data:any = '';
  
  constructor(public http: Http) {
      this.get_game_data("1");
  }


  get_game_data(game_id) {
    return new Promise((resolve, reject) => {
         this.http.get(Game_Constants.API_URL+"/game?id="+game_id )
          .subscribe(res => {
            resolve(res.json());
            // this.Game_Data = plainToClass(RootObject,res.json());
          }, (err) => {
            // reject(err);
          },()=>{
            console.log("catch");
          });
    });
  }

  post_game_data(input_data:any,post_location:string) {
    
    return new Promise((resolve, reject) => {
        let headers = new Headers();
       
        headers.append('Content-Type', 'application/json');
        this.http.post(Game_Constants.API_URL+"/game"+post_location ,input_data)
          .subscribe(res => {
            
            resolve(res.json());
          }, (err) => {
            // reject(err);
          },()=>{
            console.log("catch");
          });
    });
  }

  put_game_data(input_data:any,post_location) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log('in post');
        console.log(input_data);
        this.http.put(Game_Constants.API_URL+"/game"+post_location ,headers,input_data)
          .subscribe(res => {
            resolve(res.json());
          }, (err) => { 
            // reject(err);
             console.log("err"+err);
          });
    });
  }

  post_player_data(input_data:any) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(Game_Constants.API_URL+"/game/player",headers,input_data)
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            // reject(err);
             console.log("err"+err);
          });
    });
  }
}


  export interface GameRules {
        max_action_count: number;
        cureAmount: number;
        locationProximity: number;
        infection_lvl: number[];
        outbreak_max_lvl: number;
        research_building_count: number;
    }

    export interface Cure {
        found: boolean;
        eradicated: boolean;
    }

    export interface Disease {
        color: string;
        cure: Cure;
    }

    export interface Indicators {
        outbreak_marker: number;
        infection_rate: number;
        action_count: number;
    }

    export interface Edge {
        from: number;
        to: number;
    }

    export interface Cube {
        color: string;
        count: number;
    }

    export interface Location {
        research_building: boolean;
        color: string;
        latitude: number;
        cubes: Cube[];
        alias: string;
        id: number;
        longitude: number;
    }

    export interface Map {
        city: string;
        edges: Edge[];
        locations: Location[];
    }

    export interface At {
        latitude: number;
        longitude: number;
    }

    export interface DiseaseToken {
        color: string;
        count: number;
    }

    export interface Tokens {
        disease_tokens: DiseaseToken[];
    }

    export interface Player {
        at: At;
        name: string;
        tokens: Tokens;
        id: number;
    }

    export interface Game {
        game_rules: GameRules;
        inProgress: boolean;
        lost: boolean;
        won: boolean;
        diseases: Disease[];
        indicators: Indicators;
        map: Map;
        game_id: string;
        player: Player[];
    }

    export class RootObject {
        game: Game;
    }
