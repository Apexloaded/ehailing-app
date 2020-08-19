import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { PmlRouting, ApiResponse, Terminal, Staff, Customer } from '../models';
import { ApiService, EnvService, AuthService } from '../services';
import { ID } from '../helpers';


@Injectable()
export class PmlRoutings {

  pmlRoutings: PmlRouting[] = [];
  user: Customer;
  terminalId = Terminal['id'];

  constructor(authService: AuthService, private apiService: ApiService, private env: EnvService) {
    // this.user = authService.getUser();
    // this.terminalId = this.user.terminal.id;
    let queryString = `?sort=-createdAt`;
    queryString += `&populate=pmlShipment,pmlWaybill,terminal,terminalTo,terminalFrom`;
    queryString += `,partnerFrom,partnerTo,staffForwarding,staffReceiving,createdBy,updatedBy`;
    this.recordRetrieve(queryString).then(res => { this.pmlRoutings = res.payload; console.log(res) });
  }
  
  query(params?: any) {
    if (!params) {
      return this.pmlRoutings;
    }
    return this.pmlRoutings.filter((item) => {
      for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const field = item[key];
            if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
              return item;
            } else if (field === params[key]) {
              return item;
            }
          }
      }
      return null;
    });
  }

  add(record: PmlRouting) {
    this.pmlRoutings.push(record);
  }

  delete(record: PmlRouting) {
    this.pmlRoutings.splice(this.pmlRoutings.indexOf(record), 1);
  }

  async recordRetrieve(queryString = ''): Promise<ApiResponse> {
    const url = `${this.env.API_URL}/pml-routings${queryString}`;
    const proRes = this.apiService.getApi(url).pipe(
      map((res: ApiResponse) => res));
    return await proRes.toPromise();
  }
  
  async recordCreate(record: PmlRouting): Promise<ApiResponse> {
    const url = `${this.env.API_URL}/pml-routings`;
    const proRes = this.apiService.postApi(url, record).pipe(
      map((res: ApiResponse) => {
        if (res.success && res.payload) {
          console.log('recordCreate() successful =>', res.payload);
          let queryString = `?_id=${res.payload.id}`;
          queryString += `&populate=pmlShipment,pmlWaybill,terminal,terminalTo,terminalFrom`;
          queryString += `,partnerFrom,partnerTo,staffForwarding,staffReceiving,createdBy,updatedBy`;
          this.recordRetrieve(queryString).then(res => {
            this.add(res.payload[0])
          })
        }
        return res;
      }));
    return await proRes.toPromise();
}

async recordUpdate(record: PmlRouting, payload): Promise<ApiResponse> {
    const url = `${this.env.API_URL}/pml-routings/${record.id}`;
    const proRes = this.apiService.updateApi(url, payload).pipe(
      map((res: ApiResponse) => {
        if (res.success && res.payload) {
          this.delete(record);
          console.log('recordUpdate() successful =>', res.payload);
          let queryString = `?_id=${res.payload.id}`;
          queryString += `&populate=pmlShipment,pmlWaybill,terminal,terminalTo,terminalFrom`;
          queryString += `,partnerFrom,partnerTo,staffForwarding,staffReceiving,createdBy,updatedBy`;
          this.recordRetrieve(queryString).then(res => {
            this.add(res.payload[0])
          })
        }
        return res;
      }));
    return await proRes.toPromise();
}

  async recordPatch(record: PmlRouting): Promise<ApiResponse> {
    const url = `${this.env.API_URL}/pml-routings/${record.id}`;
    const proRes = this.apiService.patchApi(url, { deleted: true }).pipe(
      map((res: ApiResponse) => {
        this.delete(record);
        return res;
      }));
    return await proRes.toPromise();
  }

  async recordDelete(record: PmlRouting): Promise<ApiResponse> {
    const url = `${this.env.API_URL}/pml-routings/${record.id}`;
    const proRes = this.apiService.deleteApi(url).pipe(
      map((res: ApiResponse) => {
        this.delete(record);
        return res;
      }));
    return await proRes.toPromise();
  }
}
