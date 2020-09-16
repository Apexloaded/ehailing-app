import { Injectable } from '@angular/core';
import { ApiResponse } from '../models';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { Mail } from '../models/mail';

@Injectable()
export class PmtMail {
    mail: Mail[];

    constructor(private apiService: ApiService, private authService: AuthService) {
        this.authService.getUser().then(user => {
            const queryString = `?senderId=${user.id}&sender=customer`;
            this.recordRetrieve(queryString).then(res => {
                this.mail = res.payload;
            });
        });
    }

    query(params?: any) {
        if (!params) {
            return this.mail;
        }
    }

    add(record) {
        this.mail.push(record);
    }

    delete(record: Mail) {
        this.mail.splice(this.mail.indexOf(record), 1);
    }

    async recordRetrieve(queryString = ''): Promise<ApiResponse> {
        const url = `message/mails${queryString}`;
        const proRes = this.apiService.getApi(url).pipe(
            map((res: ApiResponse) => res));
        return await proRes.toPromise();
    }

    async recordCreate(record, queryString): Promise<ApiResponse> {
        const url = `message/mails${queryString}`;
        const proRes = this.apiService.postApi(url, record).pipe(
            map((res: ApiResponse) => {
                if (res.success && res.payload) {
                    console.log(res.payload);
                    return res;
                }
                return res;
            }));
        return await proRes.toPromise();
    }

    async recordUpdate(mail, payload): Promise<ApiResponse> {
        const url = `message/mails/${mail.id}`;
        const proRes = this.apiService.updateApi(url, payload).pipe(
            map((res: ApiResponse) => {
                if (res.success && res.payload) {
                    return res;
                }
                return res;
            }));
        return await proRes.toPromise();
    }

    // async recordPatch(record: Reservations): Promise<ApiResponse> {
    //     const url = `pml/pmt-schedules/${record.id}`;
    //     const proRes = this.apiService.patchApi(url, { deleted: true }).pipe(
    //         map((res: ApiResponse) => {
    //             // this.delete(record);
    //             return res;
    //         }));
    //     return await proRes.toPromise();
    // }

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
