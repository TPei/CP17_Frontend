import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers:[Router]
})
export class AppComponent {

  // constructor(router:Router){
  //   // router.navigateByUrl('./component/login/login.component');
  // }



  title = 'app works!';
}
