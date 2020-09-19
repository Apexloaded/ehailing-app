import { Component, OnInit } from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {Tickets} from '../../models/pmt-tickets';
import {ReplyTicketComponent} from "../reply-ticket/reply-ticket.component";

@Component({
  selector: 'app-tickets-details',
  templateUrl: './tickets-details.component.html',
  styleUrls: ['./tickets-details.component.scss'],
})
export class TicketsDetailsComponent implements OnInit {
  public ticket: any;
  public hasReplied: string;
  constructor(
      private navParams: NavParams,
      private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.ticket = this.navParams.data ? this.navParams.data : null;
    if (this.ticket.officerReply) {
      this.hasReplied = 'Replied';
    } else {
      this.hasReplied = 'No Reply';
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }

  replyTicket(ticket: Tickets) {
    this.modalCtrl.create({
      component: ReplyTicketComponent,
      componentProps: ticket,
      cssClass: 'reply-modal'
    }).then(el => {
      el.present();
    });
  }

}
