
import { State } from './state';
import { Terminal } from './terminal';

export class City {
    id: string;
    name: string;
    state: State;
    photo: string;
    terminals: Terminal[];
    abbreviation: string;
    country: string;

    constructor(fields: any) {
        this.country = 'NG';
        // Quick and dirty extend/assign fields to this model
        for (const f in fields) {
            // @ts-ignore
            this[f] = fields[f];
        }
    }

}

export interface City {
 //   [prop: string]: any;
    id: string;
    name: string;
    state: State;
    photo: string;
    terminals: Terminal[];
    abbreviation: string;
    country: string;
}
