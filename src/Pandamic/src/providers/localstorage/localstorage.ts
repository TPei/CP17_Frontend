import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
  Generated class for the LocalstorageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocalstorageProvider {

  constructor(private storage: Storage) {
  }

  public save_data(key_name : string , value : string){
  	this.storage.set(key_name, value);
  }

  public get_data(key_name : string){
  	return this.storage.get(key_name);
  }

  // getusages
  // get_data(key_name).then((val) => {
  //   	val --> you value
  // 	});
}
