import { Customer } from './customer';
import { City } from './city';
import { Terminal } from './terminal';

export class PmlRequest {
  sender: Customer;
  token: string;
  name: string;
  description: string;
  city: City;
  terminal: Terminal;
  createdAt: Date;
  updatedAt: Date;

  constructor(fields: any) {
    for (const f in fields) {
      this[f] = fields[f];
    }
  }

}

export interface PmlRequest {
  sender: Customer;
  token: string;
  name: string;
  description: string;
  city: City;
  terminal: Terminal;
  createdAt: Date;
  updatedAt: Date;
}
