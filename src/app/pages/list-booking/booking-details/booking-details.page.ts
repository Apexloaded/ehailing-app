import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PmtReservations} from '../../../providers';
import {Reservations} from '../../../models';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.page.html',
  styleUrls: ['./booking-details.page.scss'],
})
export class BookingDetailsPage implements OnInit {
  public customerReservations: Reservations;
  public isLoading: boolean;
  public paymentStatus: string;
  public pickupId: string;

  public error = {
    isError: null,
    icon: null,
    title: null,
    message: null
  };

  constructor(
      private activatedRoute: ActivatedRoute,
      private pmtReservations: PmtReservations
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.isLoading = false;
        this.error.isError = true;
        this.error.icon = 'alert-outline';
        this.error.title = 'An Error Occured';
        this.error.message = 'We couldn\'t retrieve your reservations record.';
        return;
      }

      this.pickupId = paramMap.get('id');
      this.getReservations(this.pickupId);
    });
  }

  getReservations(id) {
    this.pmtReservations.recordRetrieve(`?_id=${id}&populate=pmtRoute,pmtTerminalFrom,pmtSchedule`).then(res => {
      if (res.success) {
        this.isLoading = false;
        this.customerReservations = res.payload[0];
        switch (this.customerReservations.paymentStatus) {
          case 'SUCCESSFUL':
            this.paymentStatus = 'PAID';
            break;
          case 'FAIL':
            this.paymentStatus = 'FAILED';
            break;
          case 'PENDING':
            this.paymentStatus = 'PENDING';
            break;
        }
        return;
      }
    }).catch(err => {
      this.isLoading = false;
      this.error.isError = true;
      this.error.icon = 'alert-outline';
      this.error.title = 'An Error Occured';
      this.error.message = 'We couldn\'t retrieve your reservations records, please pull down to try again.';
    });
  }

  doRefresh(ev) {
    this.isLoading = true;
    setTimeout(() => {
      this.getReservations(this.pickupId);
      ev.target.complete();
    }, 2000);
  }
}
