import { Injectable } from '@angular/core';
import { Tickets } from '../models/pmt-tickets';
import {ApiService} from './api.service';
import {AuthService} from './auth.service';
import {PmtTickets} from '../providers/tickets';

@Injectable({
    providedIn: 'root'
})

export class TicketsService {
    public tickets: Tickets;
    constructor(
        private ticketsProvider: PmtTickets,
        private authService: AuthService
    ) {}

    getTickets(query) {
        return this.ticketsProvider.recordRetrieve(query);
    }

    createTicket(data) {
        return this.ticketsProvider.recordCreate(data);
    }

    replyTicket(ticket, payload) {
        return this.ticketsProvider.recordUpdate(ticket, payload);
    }
}
