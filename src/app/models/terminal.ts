import { City } from './city';
import { County } from './county';
import { Staff } from './staff';
import { State } from './state';

export class Terminal {
    id: string;
    serial: number;
    name: string;
    manager?: Staff;
    phone?: string;
    quarter?: string;
    city?: City;
    county?: County;
    state?: State;
    address?: string;
    longitude?: number;
    latitude?: number;
    capacity?: number;
    isPmlOperational?: boolean;
    isPmtOperational?: boolean;
    isPmtOnline?: boolean;
    photo?: string;
    createdBy?: Staff;
    createdAt?: Date;
    updatedBy?: Staff;
    updatedAt?: Date;

    constructor(fields: any) {
        // Quick and dirty extend/assign fields to this model
        Object.keys(fields).forEach(key => {
            this[key] = fields[key];
        });
    }

}

export interface Terminal {
    [prop: string]: any;
    serial: number;
    name: string;
    manager?: Staff;
    phone?: string;
    quarter?: string;
    city?: City;
    county?: County;
    state?: State;
    address?: string;
    longitude?: number;
    latitude?: number;
    capacity?: number;
    isPmlOperational?: boolean;
    isPmtOperational?: boolean;
    isPmtOnline?: boolean;
    photo?: string;
    createdBy?: Staff;
    createdAt?: Date;
    updatedBy?: Staff;
    updatedAt?: Date;
}
