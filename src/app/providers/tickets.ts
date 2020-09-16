import { Injectable } from '@angular/core';
import { Tickets } from '../models/pmt-tickets';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { ApiResponse } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class PmtTickets {
    tickets: Tickets[];

    constructor(private apiService: ApiService, private authService: AuthService) {
        this.authService.getUser().then(user => {
            const queryString = `?customer=${user.id}&sort=-createdAt`;
            this.recordRetrieve(queryString).then(res => {
                this.tickets = res.payload;
            });
        });
    }

    query(params?: any) {
        if (!params) {
            return this.tickets;
        }
    }

    add(record) {
        this.tickets.push(record);
    }

    delete(record: Tickets) {
        this.tickets.splice(this.tickets.indexOf(record), 1);
    }

    async recordRetrieve(queryString = ''): Promise<ApiResponse> {
        const url = `erp/tickets${queryString}`;
        const proRes = this.apiService.getApi(url).pipe(
            map((res: ApiResponse) => res));
        return await proRes.toPromise();
    }

    async recordCreate(record, queryString = ''): Promise<ApiResponse> {
        const url = `erp/tickets${queryString}`;
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

    async recordUpdate(tickets, payload): Promise<ApiResponse> {
        const url = `erp/tickets/${tickets.id}`;
        const proRes = this.apiService.updateApi(url, payload).pipe(
            map((res: ApiResponse) => {
                if (res.success && res.payload) {
                    return res;
                }
                return res;
            }));
        return await proRes.toPromise();
    }
}