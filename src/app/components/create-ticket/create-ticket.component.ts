import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController} from '@ionic/angular';
import { PRIORITY, TYPE, COMPLAINANT } from '../../helpers';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthService, TicketsService, UtilitiesService} from '../../services';
import {Customer} from '../../models';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
})
export class CreateTicketComponent implements OnInit {
  public ticketPriority = PRIORITY;
  public ticketType = TYPE;
  public ticketForm: FormGroup;
  public user: Customer;

  constructor(
      private modalCtrl: ModalController,
      private fb: FormBuilder,
      private utilitiesService: UtilitiesService,
      private ticketsService: TicketsService,
      private authService: AuthService,
      private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.authService.getUser().then(res => {
      this.user = res;
    });
    this.buildForm();
  }

  buildForm() {
    this.ticketForm = this.fb.group({
      subject: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      priority: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      ticket: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      complaint: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  submitTicket(user: Customer) {
    if (!this.ticketForm.valid) {
      this.utilitiesService.presentToast('Ensure all fields are filled correctly', 3000);
      return;
    }

    const ticket = {
      type: this.ticketForm.controls.ticket.value,
      complainant: COMPLAINANT[2],
      customer: user.id,
      subject: this.ticketForm.controls.subject.value,
      complaint: this.ticketForm.controls.complaint.value,
      priority: this.ticketForm.controls.priority.value,
      userEmail: user.email
    };

    this.loadingCtrl.create({
      spinner: 'dots'
    }).then(el => {
      el.present().then(() => {
        this.ticketsService.createTicket(ticket).then(res => {
          el.dismiss().then(() => {
            this.ticketForm.reset();
          });
        }).catch(e => {
          el.dismiss().then(() => {
            console.log(e);
          });
        });
      });
    });

  }
}
