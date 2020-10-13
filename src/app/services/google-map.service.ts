import { Injectable } from '@angular/core';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapService {

  constructor(
      private envService: EnvService
  ) { }

  init(): Promise<any> {
    return this.initMap();
  }

  initMap(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${this.envService.googleMapsApiKey}`;
      script.async = true;
      script.defer = true;
      document.body.append(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google maps SDK not loaded');
        }
      };
    });
  }
}
