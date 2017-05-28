import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { HttpModule,Http } from "@angular/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers:[Router]
})
export class AppComponent {

  constructor( private http:Http){
    //  this.router.navigate(['/login']);
  }
  

  // title = 'app works!';
}
