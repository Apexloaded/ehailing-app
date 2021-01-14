import { PAYMENT_METHOD, PAYMENT_GATEWAY, PAYMENT_STATUS } from './payment';
import { PmtRouting } from './pmt-routing';

export interface Reservations {
    createdAt?: Date;
    amount: number;
    trxref: string;
    code?: string;
    customer: string;
    pmtTerminalFrom?: string;
    pmtSchedule: string;
    pmtRoute: PmtRouting;
    seatQuantity: number;
    seatPositions: number[];
    paymentMethod: PAYMENT_METHOD;
    paymentGateway?: PAYMENT_GATEWAY;
    paymentStatus?: PAYMENT_STATUS;
    description?: string;
    gateway: {
        currency: string;
    };
}
