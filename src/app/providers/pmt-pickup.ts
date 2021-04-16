import { Injectable } from '@angular/core';
import { ApiResponse, Reservations} from '../models';
import { ApiService, AuthService } from '../services';
import { map } from 'rxjs/operators';

@Injectable()
export class PmtPickups {
    reservations: [];

    constructor(private apiService: ApiService, private authService: AuthService) {
        this.authService.getUser().then(user => {
            // const queryString = `?customer=${user.id}&populate=pmtRoute,pmtSchedule`;
            // this.recordRetrieve(queryString).then(res => {
            //     this.reservations = res.payload;
            // });
        });
    }

    query(params?: any) {
        if (!params) {
            return this.reservations;
        }
    }

    // add(record) {
    //     this.schedules.push(record);
    // }
    //
    // delete(record: Terminal) {
    //     this.schedules.splice(this.schedules.indexOf(record), 1);
    // }

    async recordRetrieve(queryString = ''): Promise<ApiResponse> {
        const url = `pmt/pmt-pickups${queryString}`;
        const proRes = this.apiService.getApi(url).pipe(
            map((res: ApiResponse) => res));
        return await proRes.toPromise();
    }

    async recordCreate(record): Promise<ApiResponse> {
        const url = `pmt/pmt-pickups`;
        const proRes = this.apiService.postApi(url, record).pipe(
            map((res: ApiResponse) => {
                if (res.success && res.payload) {
                    return res;
                }
                return res;
            }));
        return await proRes.toPromise();
    }

    async recordUpdate(record, payload): Promise<ApiResponse> {
        const url = `pmt/pmt-pickups/operation/${record.id}`;
        const proRes = this.apiService.updateApi(url, payload).pipe(
            map((res: ApiResponse) => {
                if (res.success && res.payload) {
                    return res.payload;
                }
                return res;
            }));
        return await proRes.toPromise();
    }
    //
    // async recordPatch(record: Reservations): Promise<ApiResponse> {
    //     const url = `pml/pmt-schedules/${record.id}`;
    //     const proRes = this.apiService.patchApi(url, { deleted: true }).pipe(
    //         map((res: ApiResponse) => {
    //             // this.delete(record);
    //             return res;
    //         }));
    //     return await proRes.toPromise();
    // }
    //
    // async recordDelete(record: Reservations): Promise<ApiResponse> {
    //     const url = `pml/pmt-schedules/${record.id}`;
    //     const proRes = this.apiService.deleteApi(url).pipe(
    //         map((res: ApiResponse) => {
    //             // this.delete(record);
    //             return res;
    //         }));
    //     return await proRes.toPromise();
    // }
}
