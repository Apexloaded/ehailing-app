import { Customer } from './customer';
import { Terminal } from './terminal';
import { City } from './city';

export class PmlPickup {
  id: string;
  name: string;
  sender: Customer;
  description: string;
  terminal: Terminal;
  city: City;
  address: string;
  pickupDate: Date;
  pickupBy: string;
  pickupStatus: string;
  pmlShipment: string;
  remark: string;
  updatedBy: string;

  constructor(fields: any) {
    // Quick and dirty extend/assign fields to this model
    for (const f in fields) {
      // @ts-ignore
      this[f] = fields[f];
    }
  }
}

export interface PmlPickup {
  id: string;
  name: string;
  sender: Customer;
  description: string;
  terminal: Terminal;
  city: City;
  address: string;
  pickupDate: Date;
  pickupBy: string;
  pickupStatus: string;
  pmlShipment: string;
  remark: string;
  updatedBy: string;
}
