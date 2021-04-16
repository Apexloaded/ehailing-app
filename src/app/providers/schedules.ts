import { Injectable } from '@angular/core';
import { Terminal, ApiResponse } from '../models';
import { ApiService } from '../services';
import { map } from 'rxjs/operators';

@Injectable()
export class Schedules {
    schedules: [];

    constructor(private apiService: ApiService) {
        this.recordRetrieve().then(res => { this.schedules = res.payload; });
    }

    // query(params?: any) {
    //     if (!params) {
    //         return this.schedules;
    //     }
    //     return this.schedules.filter((item) => {
    //         for (const key in params) {
    //             const field = item[key];
    //             if (typeof field === 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
    //                 return item;
    //             } else if (field === params[key]) {
    //                 return item;
    //             }
    //         }
    //         return null;
    //     });
    // }

    // add(record) {
    //     this.schedules.push(record);
    // }
    //
    // delete(record: Terminal) {
    //     this.schedules.splice(this.schedules.indexOf(record), 1);
    // }

    async recordRetrieve(queryString = ''): Promise<ApiResponse> {
        const url = `pmt/pmt-schedules${queryString}`;
        const proRes = this.apiService.getApi(url).pipe(
            map((res: ApiResponse) => res));
        return await proRes.toPromise();
    }

    async recordCreate(record: Terminal): Promise<ApiResponse> {
        const url = `pmt-schedules`;
        const proRes = this.apiService.postApi(url, record).pipe(
            map((res: ApiResponse) => {
                if (res.success && res.payload) {
                    let queryString = `?_id=${res.payload.id}`;
                    queryString += `&populate=manager,county,city,state,createdBy,updatedBy`;
                    this.recordRetrieve(queryString).then(records => {
                        // this.add(records.payload[0]);
                    });
                }
                return res;
            }));
        return await proRes.toPromise();
    }

    async recordUpdate(record: Terminal, payload): Promise<ApiResponse> {
        const url = `pml/pmt-schedules/${record.id}`;
        const proRes = this.apiService.updateApi(url, payload).pipe(
            map((res: ApiResponse) => {
                if (res.success && res.payload) {
                    // this.delete(record);
                    let queryString = `?_id=${res.payload.id}`;
                    queryString += `&populate=manager,county,city,state,createdBy,updatedBy`;
                    this.recordRetrieve(queryString).then(records => {
                        // this.add(records.payload[0]);
                    });
                }
                return res;
            }));
        return await proRes.toPromise();
    }

    async recordPatch(record: Terminal): Promise<ApiResponse> {
        const url = `pml/pmt-schedules/${record.id}`;
        const proRes = this.apiService.patchApi(url, { deleted: true }).pipe(
            map((res: ApiResponse) => {
                // this.delete(record);
                return res;
            }));
        return await proRes.toPromise();
    }

    async recordDelete(record: Terminal): Promise<ApiResponse> {
        const url = `pml/pmt-schedules/${record.id}`;
        const proRes = this.apiService.deleteApi(url).pipe(
            map((res: ApiResponse) => {
                // this.delete(record);
                return res;
            }));
        return await proRes.toPromise();
    }
}
