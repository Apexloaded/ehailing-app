import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  public api = environment.api;
  public supportEmail = environment.PMT_SUPPORT_EMAIL;
  public apiKey = environment.API_KEY;
  public googleMapsApiKey = environment.GOOGLE_MAP_API_KEY;
  public payStack = environment.PAYSTACK_KEY;

  constructor() {}
}
