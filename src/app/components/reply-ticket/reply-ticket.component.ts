import { Component, OnInit } from '@angular/core';
import {COMPLAINANT, PRIORITY, TYPE} from "../../helpers";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../../models";
import {LoadingController, ModalController, NavParams} from "@ionic/angular";
import {AuthService, TicketsService, UtilitiesService} from "../../services";
import {Tickets} from "../../models/pmt-tickets";

@Component({
  selector: 'app-reply-ticket',
  templateUrl: './reply-ticket.component.html',
  styleUrls: ['./reply-ticket.component.scss'],
})
export class ReplyTicketComponent implements OnInit {
  public ticket;
  public ticketForm: FormGroup;

  constructor(
      private modalCtrl: ModalController,
      private fb: FormBuilder,
      private utilitiesService: UtilitiesService,
      private ticketsService: TicketsService,
      private loadingCtrl: LoadingController,
      private navParams: NavParams
  ) { }

  ngOnInit() {
    this.ticket = this.navParams.data ? this.navParams.data : null;
    this.buildForm();
  }

  buildForm() {
    this.ticketForm = this.fb.group({
      reply: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(8)]
      })
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  submitTicket(ticket: Tickets) {
    if (!ticket) {
      return;
    }
    if (!this.ticketForm.valid) {
      this.utilitiesService.presentToast('Ensure message characters is upto 8', 3000);
      return;
    }

    const payload = {
      reply: this.ticketForm.controls.reply.value,
    };

    this.loadingCtrl.create({
      spinner: 'dots'
    }).then(el => {
      el.present().then(() => {
        this.ticketsService.replyTicket(ticket, payload).then(res => {
          el.dismiss().then(() => {
            this.ticketForm.reset();
            this.modalCtrl.dismiss().then(() => {
              this.utilitiesService.presentToast('Reply Sent Successfully!', 3000);
            });
          });
        }).catch(e => {
          el.dismiss().then(() => {
            this.utilitiesService.presentToast('Something went wrong, please try again.', 3000);
          });
        });
      });
    });
  }

}
