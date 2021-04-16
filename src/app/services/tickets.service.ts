import { Injectable } from '@angular/core';
import { Tickets } from '../models/pmt-tickets';
import {PmtTickets} from '../providers/tickets';
import {EnvService} from './env.service';

@Injectable({
    providedIn: 'root'
})

export class TicketsService {
    public tickets: Tickets;
    constructor(
        private ticketsProvider: PmtTickets,
        private envService: EnvService
    ) {}

    getTickets(query) {
        return this.ticketsProvider.recordRetrieve(query);
    }

    createTicket(data) {
        return this.ticketsProvider.recordCreate(data, `?apiKey=${this.envService.apiKey}`);
    }

    replyTicket(ticket, payload) {
        return this.ticketsProvider.recordUpdate(ticket, payload);
    }
}
