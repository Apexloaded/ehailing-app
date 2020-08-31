import { Injectable } from '@angular/core';
import { PmlRequest } from '../models';
import { StorageService } from './storage.services';


@Injectable()
export class UserService {

  private requestData: PmlRequest;

  constructor() {
    this.requestData = new PmlRequest('');
  }

  setrequestData(data: PmlRequest) {
    this.requestData = Object.assign(this.requestData, data);
    return StorageService.setItem('requestData', this.requestData);
  }

  getrequestData() {
    const data = StorageService.setItem('requestData', this.requestData);
    if (!data) {
      return this.requestData = new PmlRequest('');
    }
    this.requestData = Object.assign(this.requestData, new PmlRequest(data));
    return this.requestData;
  }

}
