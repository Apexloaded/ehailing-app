import { Staff } from './staff';
import { Hub } from './hub';

export class State {
    id: string;
    name: string;
    hub: Hub;
    country: string;
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

export interface State {
    id: string;
    name: string;
    hub: Hub;
    country: string;
    createdBy?: Staff;
    createdAt?: Date;
    updatedBy?: Staff;
    updatedAt?: Date;
}
