import {Component, OnInit} from '@angular/core';
import {PmtReservations} from '../../providers';
import {Customer, Reservations} from '../../models';
import {AuthService} from '../../services';

@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.page.html',
  styleUrls: ['./list-booking.page.scss'],
})
export class ListBookingPage implements OnInit {
  public customerReservations: Array<Reservations>;
  public user: Customer;
  public isLoading: boolean;

  public error = {
    isError: null,
    icon: null,
    title: null,
    message: null
  };

  constructor(
      private pmtReservations: PmtReservations,
      private authService: AuthService
  ) {
    this.authService.getUser().then(res => {
      this.user = res;
      this.getReservation(this.user);
    });
  }

  ngOnInit() {
    this.isLoading = true;
  }

  getReservation(customer: Customer) {
    let reservationArr = [];
    reservationArr = this.pmtReservations.query() ? this.pmtReservations.query() : [];
    if (reservationArr.length > 0) {
      this.isLoading = false;
      this.customerReservations = reservationArr;
      return;
    }

    this.pmtReservations.recordRetrieve(`?customer=${customer.id}&populate=pmtRoute,pmtSchedule`).then(res => {
      if (res.success) {
        this.isLoading = false;
        this.customerReservations = res.payload;
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
      this.getReservation(this.user);
      ev.target.complete();
    }, 2000);
  }

}
