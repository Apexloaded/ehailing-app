
import { State } from './state';

export class Hub {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    states: Array<State>;
    constructor(fields: any) {
        // Quick and dirty extend/assign fields to this model
        for (const f in fields) {
            // @ts-ignore
            this[f] = fields[f];
        }
    }
}

export interface Hub {
    name: string;
    description: string;
    isActive: boolean;
    states: Array<State>;
}
