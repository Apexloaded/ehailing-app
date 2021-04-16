
import { Terminal } from './terminal';
import { County } from './county';
import { State } from './state';

export class Staff {
    id: string;
    serial?: string;
    title?: string;
    surname: string;
    otherName: string;
    gender: string;
    birthDate: Date;
    maritalStatus: string;
    children?: number;
    phone?: string;
    phoneHome?: string;
    address?: string;
    village?: string;
    state: State;
    county: County;
    country?: string;
    email?: string;
    password?: string;
    otp?: string;
    otpCount?: number;
    kin: string;
    kinPhone: string;
    kinAddress: string;
    guarantor1: string;
    guarantor1Phone: string;
    guarantor1Address: string;
    guarantor2?: string;
    guarantor2Phone?: string;
    guarantor2Address?: string;
    profession?: string;
    qualification?: string;
    institution?: string;
    tin?: number;
    annualIncome?: number;
    basicSalary?: number;
    bonus?: number;
    entertainmentAllowance?: number;
    houseAllowance?: number;
    lunchAllowance?: number;
    medicalAllowance?: number;
    transportAllowance?: number;
    utilityAllowance?: number;
    welfareAllowance?: number;
    pension?: number;
    assurance?: number;
    bankAccountNumber?: string;
    bankAccountName?: string;
    rank?: string;
    superior: Staff;
    subsidiary?: string;
    terminal: Terminal;
    notice?: string;
    remark?: string;
    photo?: string;
    isSalaryPayable?: boolean;
    isDocumentComplete?: boolean;
    accessLevel?: string;

    employment: 'EMPLOYED'|'FULLTIME'|'PARTTIME'|'LEAVE'|'PROBATED'|'SUSPENDED'|'RETIRED'| 'DISENGAGED'|'UNKNOWN';
    employedDate: Date;
    employedBy: Staff;
    parttimedDate: Date;
    parttimedBy: Staff;
    fulltimedDate: Date;
    fulltimedBy: Staff;
    leaveDate: Date;
    leaveBy: Staff;
    probatedDate: Date;
    probatedBy: Staff;
    suspendedDate: Date;
    suspendedBy: Staff;
    retiredDate: Date;
    retiredBy: Staff;
    disengagedDate: Date;
    disengagedBy: Staff;
    employmentRemark: Staff;

    //* Approval
    status: 'PENDING'|'APPROVED'|'REJECTED';
    approvedDate: Date;
    approvedBy: Staff;
    rejectedDate: Date;
    rejectedBy: Staff;
    approvalRemark: String;
    //* Authentication
    lastLogin: Date;
    currentLogin: Date;
    lastIp: String;
    currentIp: String;

    createdBy?: Staff;
    createdAt?: Date;
    updatedBy?: Staff;
    updatedAt?: Date;

    constructor(fields: any) {
        // Quick and dirty extend/assign fields to this model
        for (const f in fields) {
            // @ts-ignore
            this[f] = fields[f];
        }
    }

}

export interface Staff {
    id: string;
    serial?: string;
    title?: string;
    surname: string;
    otherName: string;
    gender: string;
    birthDate: Date;
    maritalStatus: string;
    children?: number;
    phone?: string;
    phoneHome?: string;
    address?: string;
    village?: string;
    state: State;
    county: County;
    country?: string;
    email?: string;
    password?: string;
    otp?: string;
    otpCount?: number;
    kin: string;
    kinPhone: string;
    kinAddress: string;
    guarantor1: string;
    guarantor1Phone: string;
    guarantor1Address: string;
    guarantor2?: string;
    guarantor2Phone?: string;
    guarantor2Address?: string;
    profession?: string;
    qualification?: string;
    institution?: string;
    tin?: number;
    annualIncome?: number;
    basicSalary?: number;
    bonus?: number;
    entertainmentAllowance?: number;
    houseAllowance?: number;
    lunchAllowance?: number;
    medicalAllowance?: number;
    transportAllowance?: number;
    utilityAllowance?: number;
    welfareAllowance?: number;
    pension?: number;
    assurance?: number;
    bankAccountNumber?: string;
    bankAccountName?: string;
    rank?: string;
    superior: Staff;
    subsidiary?: string;
    terminal: Terminal;
    notice?: string;
    remark?: string;
    photo?: string;
    isSalaryPayable?: boolean;
    isDocumentComplete?: boolean;
    accessLevel?: string;

    employment: 'EMPLOYED'|'FULLTIME'|'PARTTIME'|'LEAVE'|'PROBATED'|'SUSPENDED'|'RETIRED'| 'DISENGAGED'|'UNKNOWN';
    employedDate: Date;
    employedBy: Staff;
    parttimedDate: Date;
    parttimedBy: Staff;
    fulltimedDate: Date;
    fulltimedBy: Staff;
    leaveDate: Date;
    leaveBy: Staff;
    probatedDate: Date;
    probatedBy: Staff;
    suspendedDate: Date;
    suspendedBy: Staff;
    retiredDate: Date;
    retiredBy: Staff;
    disengagedDate: Date;
    disengagedBy: Staff;
    employmentRemark: Staff;

    //* Approval
    status: 'PENDING'|'APPROVED'|'REJECTED';
    approvedDate: Date;
    approvedBy: Staff;
    rejectedDate: Date;
    rejectedBy: Staff;
    approvalRemark: String;
    //* Authentication
    lastLogin: Date;
    currentLogin: Date;
    lastIp: String;
    currentIp: String;

    createdBy?: Staff;
    createdAt?: Date;
    updatedBy?: Staff;
    updatedAt?: Date;


}
