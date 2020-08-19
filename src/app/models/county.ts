import { Staff } from './staff';
import { State } from './state';

export class County {
    id: string;
    name: string;
    state: State;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: Staff;

    constructor(fields: any) {
        Object.keys(fields).forEach(key => {
            this[key] = fields[key];
        });
    }

}

export interface County {
    id: string;
    name: string;
    state: State;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: Staff;
}
