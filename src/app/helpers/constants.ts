export const ID = {
    EMENE_TERMINAL: '5c51bc91860d8b5bc0000001',
}

export const PMT = {
    BOARDING_STATUS: { CLOSED: 'CLOSED', OPEN: 'OPEN' },
    BOOKING_METHOD: { LIVE: 'LIVE', RESERVATION: 'RESERVATION', OFFLINE: 'OFFLINE' },
    HIRING_STATUS: { CLOSED: 'CLOSED', PENDING: 'PENDING' },
    SCHEDULE_MODE: { DUMMY: 'DUMMY', TIMELY: 'TIMELY', DISABLE: 'DISABLE' },
    RESERVATION_STATUS: { BOARDED: 'BOARDED', BOOKED: 'BOOKED' },
    SCHEDULE_STATUS: { ENROUTE: 'ENROUTE', QUEUING: 'QUEUING', BOARDING: 'BOARDING' },
    ROUTE_CATEGORY: { LOCAL: 'LOCAL', HIGHWAY: 'HIGHWAY', SUBHIGHWAY: 'SUBHIGHWAY' },
    BOOKING_STATUS: {
        SCHEDULED: 'SCHEDULED',
        ARRIVED: 'ARRIVED',
        PENDING: 'PENDING',
        PROCESSING: 'PROCESSING',
        INITIATED: 'INITIATED',
        ACCEPTED: 'ACCEPTED',
        QUEUED: 'QUEUED',
        ONGOING: 'ONGOING',
        DRIVER_REACHED: 'DRIVER_REACHED',
        DRIVER_ASSIGNED: 'DRIVER_ASSIGNED',
        NO_SHOW: 'NO_SHOW',
        TIMEOUT: 'TIMEOUT',
        REJECTED: 'REJECTED',
        CANCELLED: 'CANCELLED',
        COMPLETED: 'COMPLETED',
        DRIVER_CANCELLED: 'DRIVER_CANCELLED',
        CUSTOMER_CANCELLED: 'CUSTOMER_CANCELLED',
        FAILED: 'FAILED',
        STARTED: 'STARTED',
        ON_THE_WAY: 'ON_THE_WAY',
        DELIVERED: 'DELIVERED',
        ENROUTE: 'EN-ROUTE',
    },
};

export const PAYMENT = {
    GATEWAY: {
        FLUTTERWAVE: 'FLUTTERWAVE',
        INTERSWITCH: 'INTERSWITCH',
        UNIONBANK: 'UNIONBANK',
        PAYSTACK: 'PAYSTACK',
        STRIPE: 'STRIPE',
        PAYPAL: 'PAYPAL',
        GOOGLE_WALLET: 'GOOGLE_WALLET',
        PEACE_WALLET: 'PEACE_WALLET',
    },
    METHOD: {
        GATEWAY: 'GATEWAY',
        POS: 'POS',
        CASH: 'CASH',
        CHEQUE: 'CHEQUE',
        TRANSFER: 'TRANSFER',
        USSD: 'USSD',
        WALLET: 'WALLET',
    },
    STATUS: { PENDING: 'PENDING', SUCCESSFUL: 'SUCCESSFUL', FAIL: 'FAIL' },

};

export const PML = {
    RECIPIENT_TYPE: { INDIVIDUAL: 'INDIVIDUAL', ORGANIZATION: 'ORGANIZATION' },
    ROUTING_STATUS: { STORE: 'STORE', TRANSIT: 'TRANSIT' },
    DELIVERY_STATUS: { PENDING: 'PENDING', STORED: 'STORED', TRANSIT: 'TRANSIT', DELIVERED: 'DELIVERED', DISCHARGED: 'DISCHARGED' },
    DELIVERY_TYPE: { HOME: 'HOME', TERMINAL: 'TERMINAL' },
    BILLING_TYPE: { PRE_PAID: 'PRE_PAID', POST_PAID: 'POST_PAID', DEDICATED: 'DEDICATED' },
    FRAGILITY: { ROBUST: 'ROBUST', FRAGILE: 'FRAGILE' },
    PERISHABILITY: { NONPERISHABLE: 'NONPERISHABLE', PERISHABLE: 'PERISHABLE' },
    COMBUSTIBILITY: { NONCOMBUSTIBLE: 'NONCOMBUSTIBLE', COMBUSTIBLE: 'COMBUSTIBLE' },
    ODIFEROUSNESS: { ODOROUS: 'ODOROUS', ODORLESS: 'ODORLESS' },
    SOLIDITY: { SOLID: 'SOLID', LIQUID: 'LIQUID' },
    UNIQUENESS: { ORDINARY: 'ORDINARY', EXTRAORDINARY: 'EXTRAORDINARY' },
};

export const GENDER = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
};

export const MARITAL_STATUS = {
    SINGLE: 'SINGLE',
    MARRIED: 'MARRIED',
    DIVORSED: 'DIVORSED',
    SEPARATED: 'SEPARATED',
    WIDOWED: 'WIDOWED',
    UNKNOWN: 'UNKNOWN',
};

export const CUSTOMER_TYPE = {
    INDIVIDUAL: 'INDIVIDUAL',
    ORGANIZATION: 'ORGANIZATION',
    UNKNOWN: 'UNKNOWN',
};

export const PERSONAL_TITLE = {
    MR: 'MR',
    MISS: 'MISS',
    MRS: 'MRS',
    DR: 'DR',
    PROF: 'PROF',
    ENGR: 'ENGR',
    BARR: 'BARR',
    FR: 'FR',
    REV: 'REV',
    PASTOR: 'PASTOR',
    CHIEF: 'CHIEF',
    HON: 'HON',
    SIR: 'SIR',
    MADAM: 'MADAM',
    UNKNOWN: 'UNKNOWN',
};

export const SUBSIDIARY = {
    PMT: 'PMT',
    PML: 'PML',
    PET: 'PET',
    SHOP: 'SHOP',
    PRESS: 'PRESS',
    SPARES: 'SPARES',
    ASSEMBLY: 'ASSEMBLY',
    CHEMICAL: 'CHEMICAL',
    PEACEGROUP: 'PEACEGROUP',
    UNKNOWN: 'UNKNOWN',
};

export const VEHICLE = {
    VEHICLE_MAKE: {
        TOYOTA: 'TOYOTA',
        UGAMA: 'UGAMA',
        MEIYER: 'MEIYER',
        SIENNA: 'SIENNA',
        UNKNOWN: 'UNKNOWN',
    },
    VEHICLE_CATEGORY: {
        PMT: 'PMT',
        PATROL: 'PATROL',
        PML: 'PML', // DELIVERY VAN
        PET: 'PET', // DELIVERY VAN
        PRESS: 'PRESS', // DELIVERY VAN
        SHOP: 'SHOP', // FOR SALE
        OFFICIAL_PRIVATE: 'OFFICIAL_PRIVATE', // PRIVATE USE
        OFFICIAL_GENERAL: 'OFFICIAL_GENERAL', // GENERAL USE
        UNKNOWN: 'UNKNOWN',
    },
    VEHICLE_CLASS: {
        FIRST: 'FIRST', // New Vehicle with Aircondition
        SECOND: 'SECOND', // New Vehicle without Aircondition
        THIRD: 'THIRD', // Old Vehicle
        UNKNOWN: 'UNKNOWN',
    },
    VEHICLE_TYPE: {
        BUS: 'BUS',
        CAR: 'CAR',
        TAXI: 'TAXI',
        KEKE: 'KEKE',
        BIKE: 'BIKE',
        JEEP: 'JEEP',
        PREMIUM: 'PREMIUM',
        UNKNOWN: 'UNKNOWN',
    },
    VEHICLE_LOCATION: {
        OPERATION: 'OPERATION',
        IMPOUNDED: 'IMPOUNDED',
        WORKSHOP: 'WORKSHOP',
        WAREHOUSE: 'WAREHOUSE',
        SHOP: 'SHOP',
        SCRAP: 'SCRAP',
        UNKNOWN: 'UNKNOWN',
    },
    VEHICLE_ASSIGNMENT: {
        ASSIGNED: 'ASSIGNED',
        REASSIGNED: 'REASSIGNED',
        UNASSIGNED: 'UNASSIGNED',
        UNKNOWN: 'UNKNOWN',
    },
    VEHICLE_CUSTODIAN: {
        DRIVER: 'DRIVER',
        STAFF: 'STAFF',
        PARTNER: 'PARTNER',
        UNKNOWN: 'UNKNOWN',
    },
};

export const DRIVER_TYPE = {
    OWNER: 'OWNER',
    DTO: 'DTO',
    PMT: 'PMT',
    PARTNER: 'PARTNER',
};

export const RATING = {
    SUBJECT: ['STAFF', 'DRIVER', 'TERMINAL', 'VEHICLE'],
};

export const DATABASE = {
    TABLES: ['STAFF', 'DRIVER', 'OWNER', 'VEHICLE', 'ASSET'],
    PRELOAD_TABLE_DATA: { TRUE: true, FALSE: false, DEFAULT: false },
    RECORD_STATUS: {
        PENDING: 'PENDING',
        REJECTED: 'REJECTED',
        ACKNOWLEDGED: 'ACKNOWLEDGED',
        APPROVED: 'APPROVED',
        AUTHORIZED: 'AUTHORIZED',
        AUDITED: 'AUDITED',
        CLOSED: 'CLOSED',
    },
    BASE_ID: {
        STAFF: '5a51bc91860d8b5ba',
        DRIVER: '5b51bc91860d8b5bb',
        TERMINAL: '5c51bc91860d8b5bc',
        VEHICLE: '5d51bc91860d8b5bd',
        SPARES: '5e51bc91860d8b5be',
        ASSET: '5f51bc91860d8b5bf',
        COUNTRY: '5951bc91860d8b5b9',
        HUB: '5951bc91860d8b5c9',
        STATE: '5851bc91860d8b5a7',
        COUNTY: '5851bc91860d8b5b7',
        CITY: '5851bc91860d8b5c7',
        OFFICE: '5651bc91860d8b5b6',
        ACCOUNT: '5651bc91860d8b5b6',
        BANK: '5651bc91860d8b5b6',
        BANK_ACCOUNT: '5651bc91860d8b5ba',
        PARTNER: '5551bc91860d8b5b5',
        CUSTOMER: '5a51bc91860d8b5a5',
        PMT_SCHEDULE: '5451bc91860d8b545',
        PMT_ROUTE: '5351bc91860d8b535',
        SETTING: '5051bc91860d8b505',
        PML_BILLING: '5651bd91860d8b5bd',
        OFFENCE: '5651bc91860d8b5bc',
        DOCUMENT: '5651bb91860d8b5bb',
        ACCIDENT_CAUSE: '5651ab91860d8b5ab',
        VOUCHER_STAGE: '565bab91860d8b5bb',
    },
};

export const EMAIL = {
    CONTACT: 'nditah@gmail.com',
    PEACEGROUP: 'nditah@gmail.com',
    PMT: 'nditah@gmail.com',
    PML: 'nditah@gmail.com',
    PRESS: 'nditah@gmail.com',
    PET: 'nditah@gmail.com',
};

export const SMS = {
    PEACE_SMS_SENDER: '+13234981706',
};

export const API = {
    URL: 'https://jibrila.herokuapp.com',
};

export const FLUTTERWAVE = {
    LIVE_URL: 'https://api.ravepay.co',
    TEST_URL: 'https://ravesandboxapi.flutterwave.com',
    PAY: '/flwv3-pug/getpaidx/api/v2/hosted/pay',
    VERIFY: '/flwv3-pug/getpaidx/api/v2/verify',
    REDIRECT_URL: 'https://pmtonline.herokuapp.com/verify',
    SUBACCOUNT: '/v2/gpx/subaccounts',
    TRANSACTION: '/v2/gpx/transactions',
    TRANSACTION_EVENTS: '/v2/gpx/transactionmeta/events',
    SETTLEMENT: '/v2/merchant/settlements',
    BVN: '/v2/kyc/bvn',
};

export const USER_ROLES = {
    ADMIN: 'ADMIN',
    CUSTOMER: 'CUSTOMER',
    DRIVER: 'DRIVER',
    STAFF: 'STAFF',
};

export const TRANSPORT_DOC = {
    LOGO: 'LOGO',
    DOCUMENT: 'DOCUMENT',
    OTHERS: 'OTHERS',
    INSURANCE: 'INSURANCE',
    INSURANCE_PLACE: 'INSURANCE_PLACE',
    PERMIT: 'PERMIT',
    OWNERSHIP: 'OWNERSHIP',
    VEHICLE: 'VEHICLE',
};

export const INPUT_TYPE = {
    TEXT: 'TEXT',
    TEXTAREA: 'TEXTAREA',
    DROPDOWN: 'DROPDOWN',
    FILE: 'FILE',
    DATETIME: 'DATETIME',
    LOCATION: 'LOCATION',
    SELECTLIST: 'SELECTLIST',
    RADIOBUTTON: 'RADIOBUTTON',
    CHECKBOXES: 'CHECKBOXES',
    DATE: 'DATE',
    TIME: 'TIME',
    NUMBER: 'NUMBER',
};

export const ISSUE_PRIORITY = {
    EMERGENCY: 'P1',
    HIGH: 'P2',
    NORMAL: 'P3',
    LOW: 'P4',
};

export const VOUCHER_STAGES = [
    { step: 1, state: 'RAISED',         action: 'RAISE',             officer: 'STAFF',              description: 'Create a document'                           },
    { step: 2, state: 'ACKNOWLEDGED',   action: 'ACKNOWLEDGEMENT',   officer: 'HOD',                description: 'Acknowledges the request'                    },
    { step: 3, state: 'ENDORSED',       action: 'ENDORSEMENT',       officer: 'Internal Audit',     description: 'Endorse if it asses compliance test'         },
    { step: 4, state: 'AUTHORIZED',     action: 'AUTHORIZATION',     officer: 'Finance HOD',        description: 'Approves if the expense is within budget'    },
    { step: 5, state: 'APPROVED',       action: 'APPROVAL',          officer: 'Director',           description: 'Need assessment, beauraucratic compliance'   },
    { step: 6, state: 'CHECKED',        action: 'CHECKING',          officer: 'Chairman',           description: 'Chairman signs the final approval'           },
    { step: 7, state: 'PAID',           action: 'PAYMENT',           officer: 'CASHIER',            description: 'Payment by cash, cheque, transfer'           },
    { step: 8, state: 'AUDITED',        action: 'AUDITING',          officer: 'Internal Audit',     description: 'Final Evaluation to close the record'        },
    { step: 9, state: 'CLOSED',         action: 'CLOSING',           officer: 'External Audit',     description: 'External Auditor closes the record'          },
];

export const MAINTENANCE_STAGES = [
    { step: 1, state: 'REGISTERED',     action: 'REGISTER',     officer: 'Partner',                 description: 'Create a maintenance record'                           },
    { step: 2, state: 'CHECKED',        action: 'CHECK',        officer: 'HOD',                     description: 'Needs assessment for maintenance'                    },
    { step: 3, state: 'ASSIGNED',       action: 'ASSIGN',       officer: 'Maintenance Manager',     description: 'Assign the vehicle to a team'         },
    { step: 4, state: 'SPARES',         action: 'REQUEST',      officer: 'Maintenance Team Lead',   description: 'Raise a request for spare parts'    },
    { step: 5, state: 'CONTROL',        action: 'APPROVE',      officer: 'Quality Control',         description: 'Approve Spare Request'   },
    { step: 6, state: 'ISSUANCE',       action: 'ISSUE',        officer: 'Spares',                  description: 'Issues part to Parner with DTO Maintenance T&C'           },
    { step: 7, state: 'TEST',           action: 'TEST',         officer: 'Partner',                 description: 'Partner test Vehicle and confirm'           },
    { step: 7, state: 'FINALIZE',       action: 'FINALIZE',     officer: 'Tracking manager',        description: 'Partner reports to tracking manager'           },
    { step: 8, state: 'AUDITED',        action: 'AUDITING',     officer: 'Internal Audit',          description: 'Final Evaluation to close the record'        },
    { step: 9, state: 'CLOSED',         action: 'CLOSING',      officer: 'External Audit',          description: 'External Auditor closes the record'          },
];

export const COMPLAINANT = ['STAFF', 'PARTNER', 'CUSTOMER', 'SUPPLIER'];
export const PRIORITY = ['LOW', 'NORMAL', 'HIGH'];
export const STATUS = ['OPEN', 'CLOSED', 'PENDING'];
export const TYPE = ['BILLING', 'PMT', 'PML', 'ERP', 'TECHNICAL'];
