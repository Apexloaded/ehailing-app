import { Customer } from './customer';

export class LoginResponse {
    success: boolean;
    payload: { token: '', user: any };
    message: string;
}
