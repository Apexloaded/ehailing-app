import { Terminal } from './terminal';

export class Customer {
    id: string;
    customerType: string;
    title: string;
    surname: string;
    otherName: string;
    gender: string;
    birthDate: Date;
    phone: string;
    phoneHome: string;
    email: string;
    password: string;
    otp: string;
    otpCount: number;
    contactPerson: string;
    contactPersonPhone: string;
    product: string;
    photo: string;
    address: string;
    country: string;
    website: string;
    isEngrClient: boolean;
    isPmtClient?: boolean;
    isPmlClient: boolean;
    isPetClient: boolean;
    isShopClient: boolean;
    isTenant: boolean;
    company: string;
    industry: string;
    state: string;
    county: string;
    isStaff: boolean;
    wallet: number;
    terminal: Terminal;
    isPhoneVerified: boolean;
    isEmailVerified: boolean;
    updatedAt?: Date;
    skype?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    points?: number;
    remark?: string;

    constructor(fields: any) {
        // Quick and dirty extend/assign fields to this model
        for (const f in fields) {
            // @ts-ignore
            this[f] = fields[f];
        }
    }

}

export interface Customer {
    id: string;
    customerType: string;
    title: string;
    surname: string;
    otherName: string;
    gender: string;
    birthDate: Date;
    phone: string;
    phoneHome: string;
    email: string;
    password: string;
    otp: string;
    otpCount: number;
    contactPerson: string;
    contactPersonPhone: string;
    product: string;
    photo: string;
    address: string;
    country: string;
    website: string;
    isEngrClient: boolean;
    isPmtClient?: boolean;
    isPmlClient: boolean;
    isPetClient: boolean;
    isShopClient: boolean;
    isTenant: boolean;
    company: string;
    industry: string;
    state: string;
    county: string;
    isStaff: boolean;
    wallet: number;
    terminal: Terminal;
    isPhoneVerified: boolean;
    isEmailVerified: boolean;
    updatedAt?: Date;
    skype?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    points?: number;
    remark?: string;
}
