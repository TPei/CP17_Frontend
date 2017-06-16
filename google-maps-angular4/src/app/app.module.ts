import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MapComponent } from './component/map/map.component';
import { AgmCoreModule } from '@agm/core';
import { SiteMapComponent } from './component/site-map/site-map.component';
import { MarkerClusterDirective } from './directive/marker-cluster.directive';

@NgModule({
  declarations: [
    AppComponent,
    // CommonModule,
    MapComponent,
    SiteMapComponent,
    MarkerClusterDirective,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // MarkerClusterDirective,
    // MapComponent,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB3iOKgL5F3C5luaBh5Hhbj1pa2TCJqIhw'
    })
  ],
  // exports: [
  //   MarkerClusterDirective
  // ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
