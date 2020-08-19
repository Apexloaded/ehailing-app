import {Customer} from './customer';
import {Terminal} from './terminal';
import {PmlRouting} from './pml-routing';

export class PmlShipment {
    id: string;
    code: string;
    name: string;
    pmlRoutings: Array<PmlRouting>;
    sender: Customer;
    recipient: Customer;
    urgency: number;
    distance: number;
    mass: number;
    volume: number;
    worth: number;
    isFragile: boolean;
    isPerishable: boolean;
    isCombustible: boolean;
    isOdiferous: boolean;
    isLiquid: boolean;
    isUnique: boolean;
    description: string;
    terminalFrom: Terminal;
    terminalTo: Terminal;
    terminalStore: Terminal;
    travelHour: number;
    departureDate: Date;
    expectedDate: Date;
    billingType: 'PRE_PAID' | 'POST_PAID' | 'DEDICATED';
    costEstimate: number;
    costPayable: number;
    paymentMethod: 'GATEWAY' | 'POS' | 'CASH' | 'CHEQUE' | 'TRANSFER' | 'USSD';
    paymentGateway: 'UNIONBANK' | 'PAYSTACK';
    paymentStatus: 'PENDING' | 'SUCCESSFUL' | 'FAIL';
    deliveryDate: Date;
    deliveryType: 'HOME' | 'TERMINAL';
    deliveryAddress: string;
    deliveryStatus: 'PENDING' | 'STORED' | 'TRANSIT' | 'DELIVERED' | 'DISCHARGED' | 'PICKEDUP' | 'SHIPPED' | 'CANCELLED' | 'DECLINED';
    routing: string;
    routingStatus: 'STORE' | 'TRANSIT';
    waybilledDate: Date;
    shippedDate: Date;
    dispatchedDate: Date;
    arrivedDate: Date;
    deliveredDate: Date;
    identification: string;
    remark: string;
    recipientConfirm: boolean;
    recipientConfirmDate: Date;
    recipientConfirmRemark: string;
    createdAt?: Date;
    updatedAt?: Date;


    constructor(fields: any) {
        for (const f in fields) {
            this[f] = fields[f];
        }
    }

}

export interface PmlShipment {
    id: string;
    code: string;
    name: string;
    pmlRoutings: Array<PmlRouting>;
    sender: Customer;
    recipient: Customer;
    urgency: number;
    distance: number;
    mass: number;
    volume: number;
    worth: number;
    isFragile: boolean;
    isPerishable: boolean;
    isCombustible: boolean;
    isOdiferous: boolean;
    isLiquid: boolean;
    isUnique: boolean;
    description: string;
    terminalFrom: Terminal;
    terminalTo: Terminal;
    terminalStore: Terminal;
    travelHour: number;
    departureDate: Date;
    expectedDate: Date;
    billingType: 'PRE_PAID' | 'POST_PAID' | 'DEDICATED';
    costEstimate: number;
    costPayable: number;
    paymentMethod: 'GATEWAY' | 'POS' | 'CASH' | 'CHEQUE' | 'TRANSFER' | 'USSD';
    paymentGateway: 'UNIONBANK' | 'PAYSTACK';
    paymentStatus: 'PENDING' | 'SUCCESSFUL' | 'FAIL';
    deliveryDate: Date;
    deliveryType: 'HOME' | 'TERMINAL';
    deliveryAddress: string;
    deliveryStatus: 'PENDING' | 'STORED' | 'TRANSIT' | 'DELIVERED' | 'DISCHARGED' | 'PICKEDUP' | 'SHIPPED' | 'CANCELLED' | 'DECLINED';
    routing: string;
    routingStatus: 'STORE' | 'TRANSIT';
    waybilledDate: Date;
    shippedDate: Date;
    dispatchedDate: Date;
    arrivedDate: Date;
    deliveredDate: Date;
    identification: string;
    remark: string;
    recipientConfirm: boolean;
    recipientConfirmDate: Date;
    recipientConfirmRemark: string;
    createdAt?: Date;
    updatedAt?: Date;

}
