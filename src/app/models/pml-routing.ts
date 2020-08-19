import { Terminal } from './terminal';
import { PmlShipment } from './pml-shipment';

export class PmlRouting {
  id: string;
  kind: 'SHIPMENT'|'WAYBILL';
  pmlShipment: PmlShipment;
  // pmlWaybill: PmlWaybill;
  terminal: Terminal;
  terminalTo: Terminal;
  terminalFrom: Terminal;
  forwardingDate: Date;
  receivingDate: Date;
  forwardingCharge: number;
  remark: string;
  routingAction: 'RECEIVING'|'FORWARDING';
  status: 'PENDING'|'COMPLETE';
  createdAt?: Date;
  updatedAt?: Date;

  constructor(fields: any) {
    // Quick and dirty extend/assign fields to this model
    for (const f in fields) {
      // @ts-ignore
      this[f] = fields[f];
    }
  }

}

export interface PmlRouting {
  pmlShipment: PmlShipment;
  // pmlWaybill: PmlWaybill;
  terminal: Terminal;
  terminalTo: Terminal;
  terminalFrom: Terminal;
  forwardingDate: Date;
  receivingDate: Date;
  forwardingCharge: number;
  remark: string;
  routingAction: 'RECEIVING'|'FORWARDING';
  status: 'PENDING'|'COMPLETE';
  createdAt?: Date;
  updatedAt?: Date;
}
