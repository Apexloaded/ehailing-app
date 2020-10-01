import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BehaviorSubject } from 'rxjs';
import { Coordinates } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private watchId: string;
  private latLng = {
    lat: null,
    lng: null
  };
  private geoPoints = new BehaviorSubject<Coordinates>(null);
  constructor(
      private geolocation: Geolocation
  ) {
    this.getCurrentPosition();
  }

  get getCoords() {
    return this.geoPoints;
  }

  private getCurrentPosition() {
    this.geolocation.getCurrentPosition().then((res) => {
      this.latLng.lat = res.coords.latitude;
      this.latLng.lng = res.coords.longitude;
      this.geoPoints.next(this.latLng);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}
