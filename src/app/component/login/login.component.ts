import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpModule,Http } from "@angular/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // providers:[Router]
})
export class LoginComponent implements OnInit{

  constructor( private http:Http) { }

  ngOnInit() {
  }

  public onButtonClick():void {
    
    console.log("checleddsfds");
    //  this.router.navigate(['/startup']);
  }

}
