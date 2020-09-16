import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {CreateTicketComponent} from '../../components/create-ticket/create-ticket.component';
import {Tickets} from '../../models/pmt-tickets';
import {Customer} from "../../models";
import {StorageService, TicketsService} from "../../services";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {
  public tickets: Tickets;
  public isLoading: boolean;
  public user: Customer;

  public error = {
    isError: null,
    icon: null,
    title: null,
    message: null
  };

  constructor(
      private modalCtrl: ModalController,
      private ticketsService: TicketsService
  ) { }

  ngOnInit() {
    this.user = StorageService.getItem('user');
    this.getTickets(this.user);
    this.isLoading = true;
  }

  IonViewWillEnter() {
    console.log(this.user);
    this.getTickets(this.user);
  }

  getTickets(customer: Customer) {
    // const inboxArray = this.supportService.inboxMail() ? this.supportService.inboxMail() : [];
    // if (inboxArray.length > 0) {
    //   this.isLoading = false;
    //   this.customerMail = inboxArray;
    //   return;
    // }
    this.ticketsService.getTickets(`?customer=${customer.id}&sort=-createdAt`).then(res => {
      if (res.success) {
        this.isLoading = false;
        this.tickets = res.payload;
        return;
      }
    }).catch(err => {
      this.isLoading = false;
      this.error.isError = true;
      this.error.icon = 'alert-outline';
      this.error.title = 'An Error Occurred!';
      this.error.message = 'We couldn\'t retrieve your ticket records, please pull down to try again.';
    });
  }

  createTicket() {
    this.modalCtrl.create({
      component: CreateTicketComponent
    }).then(el => {
      el.present();
    });
  }
}
