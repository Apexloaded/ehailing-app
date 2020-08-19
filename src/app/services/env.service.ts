import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
 // API_URL = environment.CURRENT_URL;
  API_URL = 'http://172.16.17.50:81/api';
  // API_URL = 'http://63.34.89.156/api';
  // API_URL = 'http://localhost:5000/api';

  constructor() { }
}
