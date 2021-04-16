import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { State, ApiResponse } from '../models';
import { ApiService } from '../services';

@Injectable()
export class States {
    states: State[] = [];

    constructor(private apiService: ApiService) {
        let queryString = `?sort=name`;
        queryString += `&populate=state,terminals`;
        this.recordRetrieve(queryString).then(res => { this.states = res.payload; });
    }

    query(params?: any) {
        if (!params) {
            return this.states;
        }
        return this.states.filter((item) => {
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

    add(record: State) {
        this.states.push(record);
    }

    delete(record: State) {
        this.states.splice(this.states.indexOf(record), 1);
    }

    async recordRetrieve(queryString = ''): Promise<ApiResponse> {
        const url = `pml/states${queryString}`;
        const proRes = this.apiService.getApi(url).pipe(
            map((res: ApiResponse) => res));
        return await proRes.toPromise();
    }
}
