import { PAYMENT_METHOD, PAYMENT_GATEWAY, PAYMENT_STATUS } from './payment';

export interface Reservations {
    amount: number;
    trxref: string;
    code?: string;
    customer: string;
    pmtTerminalFrom?: string;
    pmtSchedule: string;
    pmtRoute: string;
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
