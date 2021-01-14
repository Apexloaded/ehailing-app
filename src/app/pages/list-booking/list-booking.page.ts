import {Component, OnInit} from '@angular/core';
import {PmtReservations} from '../../providers';
import {Customer, Reservations} from '../../models';
import {AuthService, UtilitiesService} from '../../services';
import {PreviousRouteService} from '../../services/previous-route.service';
import {Router} from '@angular/router';
import {PickupDetailsComponent} from "../../components/pickup-details/pickup-details.component";

@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.page.html',
  styleUrls: ['./list-booking.page.scss'],
})
export class ListBookingPage implements OnInit {
  public customerReservations: Array<Reservations>;
  public user: Customer;
  public isLoading: boolean;
  public previousRoute: string;

  public error = {
    isError: null,
    icon: null,
    title: null,
    message: null
  };

  constructor(
      private pmtReservations: PmtReservations,
      private authService: AuthService,
      private prevRoute: PreviousRouteService,
      private router: Router,
      private utilitiesService: UtilitiesService
  ) {
    this.authService.getUser().then(res => {
      this.user = res;
      this.getReservation(this.user);
    });
  }

  ngOnInit() {
    this.isLoading = true;
  }

  ionViewWillEnter() {
    this.previousRoute = this.prevRoute.getPreviousRoute;
    if (this.previousRoute !== null &&
        !this.previousRoute.includes('/list-booking')
    ) {
      return;
    }
    this.previousRoute = '/home';
  }

  getReservation(customer: Customer) {
    // let reservationArr = [];
    // reservationArr = this.pmtReservations.query() ? this.pmtReservations.query() : [];
    // if (reservationArr.length > 0) {
    //   this.isLoading = false;
    //   this.customerReservations = reservationArr;
    //   return;
    // }

    this.pmtReservations.recordRetrieve(`?customer=${customer.id}&populate=pmtRoute,pmtSchedule`).then(res => {
      if (res.success) {
        this.isLoading = false;
        this.customerReservations = res.payload;
        console.log(this.customerReservations);
        return;
      }
    }).catch(err => {
      console.log(err);
      this.isLoading = false;
      this.error.isError = true;
      this.error.icon = 'alert-outline';
      this.error.title = 'An Error Occurred!';
      this.error.message = 'We couldn\'t retrieve your reservations records, please pull down to try again.';
    });
  }

  viewBooking(reservation) {
    if (reservation.paymentStatus === 'PENDING') {
      this.utilitiesService.presentToast('Verifying Reservation...', 4000);
      this.pmtReservations.recordRetrieve(`/verify/${reservation.code}`).then(res => {
        if (res.payload.paymentStatus !== 'PENDING') {
          this.router.navigate(['/', 'list-booking', reservation.id]);
          return;
        }
        this.utilitiesService.presentToast('Payment is still pending', 4000);
      }).catch(err => {
        this.utilitiesService.presentToast('Something went wrong, please try again', 3000);
      });
      return;
    }
    this.router.navigate(['/', 'list-booking', reservation.id]);
  }

  doRefresh(ev) {
    this.isLoading = true;
    setTimeout(() => {
      this.getReservation(this.user);
      ev.target.complete();
    }, 2000);
  }

  returnBack(url) {
    this.router.navigateByUrl(`${url}`);
  }

}
