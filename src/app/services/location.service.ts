import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BehaviorSubject } from 'rxjs';
import { Coordinates } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private watchId: string;
  private geoPoints = new BehaviorSubject<Coordinates>(null);
  constructor(
      private geolocation: Geolocation
  ) {
    this.getCurrentPosition();
  }

  getCoords() {
    return this.geoPoints;
  }

  private getCurrentPosition() {
    this.geolocation.getCurrentPosition().then((res) => {
      console.log(res);
      // resp.coords.latitude
      // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}
