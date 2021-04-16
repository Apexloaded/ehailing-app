import { Partners } from './partners';
import { PmtRouting } from './pmt-routing';
import { PmtVehicles } from './pmt-Vehicles';

export interface PmtSchedules {
    boardingDate: Date;
    code: string;
    createdAt: Date;
    createdBy: string;
    deleted: boolean;
    dtoMaintenance: number;
    dtoRepayment: number;
    dtoServiceCharge: number;
    fare: number;
    fareTotal: number;
    fuelAmount: number;
    id: string;
    isDto: boolean;
    isFull: boolean;
    isReservable: boolean;
    pmtPartner: Partners;
    partnerAllowance: number;
    partnerReceivable: number;
    pmtBoardings: [];
    pmtReservations: any[]; // ReservationObject[];
    pmtRoute: PmtRouting;
    status: PMTScheduleStatus;
    pmtTerminal: string;
    updatedAt: Date;
    pmtVehicle: PmtVehicles;
}

export enum PMTScheduleStatus {
    QUEUING = 'QUEUING',
    BOARDED = 'BOARDED',
    LOADED = 'LOADED',
    TRANSLOADED = 'TRANSLOADED',
    WAYBILLED = 'WAYBILLED',
    DEPARTED = 'DEPARTED',
    ARRIVED = 'ARRIVED',
}
