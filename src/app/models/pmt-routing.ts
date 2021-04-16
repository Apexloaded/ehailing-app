export interface PmtRouting {
    createdAt: Date;
    createdBy: string;
    deleted: boolean;
    distance: number;
    dtoAllowancePercent: number;
    dtoFuelPercent: number;
    dtoMaintenancePercent: number;
    dtoRepaymentPercent: number;
    dtoServiceChargePercent: number;
    duration: number;
    fareClass1: number;
    fareClass2: number;
    fuelLitresClass1: number;
    fuelLitresClass2: number;
    id: string;
    isAvailable: boolean;
    isReservable: boolean;
    name: string;
    partnerAllowance: number;
    pmtTerminalFrom: string;
    pmtTerminalTo: string;
    trips: number;
    type: string;
    updatedAt: Date;
    updatedBy: string;
    pmtTerminal: string;
}
