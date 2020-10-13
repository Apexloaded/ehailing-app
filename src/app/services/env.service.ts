import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  public api = environment.api;
  public supportEmail = environment.PMT_SUPPORT_EMAIL;
  public apiKey = environment.API_KEY;
  public googleMapsApiKey = environment.googleMapsApi;

  constructor() {}
}
