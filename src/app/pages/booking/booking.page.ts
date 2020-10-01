import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PreviousRouteService} from 'src/app/services/previous-route.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PmtReservations, Schedules, Terminals} from '../../providers';
import {Customer, PAYMENT_GATEWAY, PAYMENT_METHOD, PAYMENT_STATUS, PmtSchedules, Reservations, Terminal} from 'src/app/models';
import {UtilitiesService} from 'src/app/services/utilities.service';
import {IonSlides, LoadingController, ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AuthService} from '../../services';
import {PaymentOptionsComponent} from "../../components/payment-options/payment-options.component";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit, AfterViewInit {
  @ViewChild('slider') slider: IonSlides;

  public user: Customer;
  public previousRoute: string;
  public bookForm: FormGroup;
  public isLoading: boolean;
  public terminalFrom: Array<Terminal>;
  public terminalTo: Array<Terminal>;
  public isTerminalLoading: boolean;
  public isSearchingSchedule: boolean;

  public event = {
    startDate: new Date( new Date().getTime() + 1000 * 60 * 60 * 24).toISOString(),
    endDate: new Date( new Date().getTime() + 1000 * 60 * 60 * 24 * 3).toISOString()
  };

  public sliderOpt = {
    initialSlide: 0,
    slidePerView: 1
  };

  public slideIndex = 0;
  public slideLength = 0;

  seats: { label: number, selected: boolean, boarded: boolean, disabled: boolean }[] = [];
  reservations: Reservations[];
  schedule: PmtSchedules;
  pmtRoute;
  scheduleArr: PmtSchedules[];
  selectedSeats = [];

  public reservationData: Reservations = {
    amount: null,
    trxref: null,
    customer: null,
    pmtTerminalFrom: null,
    pmtSchedule: null,
    pmtRoute: null,
    seatQuantity: null,
    seatPositions: null,
    paymentMethod: null,
    paymentGateway: null,
    description: null,
    gateway: {
      currency: null
    }
  };

  constructor(
    private prevRoute: PreviousRouteService,
    private fb: FormBuilder,
    private utilitiesService: UtilitiesService,
    private pmtTerminals: Terminals,
    private pmtSchedules: Schedules,
    private router: Router,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private pmtReservations: PmtReservations,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.isTerminalLoading = true;
    this.getTerminals();
    this.buildForm();
    this.authService.getUser().then(user => {
      this.user = user;
    });
  }

  ngAfterViewInit(): void {
    this.slider.getActiveIndex().then(res => {
      this.slideIndex = res + 1;
    });

    this.slider.length().then(res => {
      this.slideLength = res;
    });
  }

  ionViewWillEnter() {
    this.previousRoute = this.prevRoute.getPreviousRoute;
    if (this.previousRoute !== null && !this.previousRoute.includes('/book')) {
      return;
    }
    this.previousRoute = '/home';
  }

  buildForm() {
    this.bookForm = this.fb.group({
      terminalFrom: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      terminalTo: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      departureDate: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      seats: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });
    this.isLoading = false;
    return;
  }

  returnBack(url: string, slider: IonSlides) {
    slider.getActiveIndex().then(res => {
      if (res === 0) {
        this.router.navigateByUrl(`${url}`);
        this.resetBookings();
        return;
      }
      this.prevSlide(slider);
    });
  }

  onIonDrag(slider: IonSlides) {
    slider.lockSwipes(true);
  }

  slideNext(slide: IonSlides) {
    if (slide) {
      slide.lockSwipes(false);
    }
    slide.slideNext();
    this.slider.getActiveIndex().then(res => {
      this.slideIndex = res + 1;
    });
  }

  prevSlide(slide: IonSlides) {
    if (slide) {
      slide.lockSwipes(false);
    }
    slide.slidePrev();
    this.slider.getActiveIndex().then(res => {
      this.slideIndex = res + 1;
    });
  }


  /******************************************************************************************************************************
   * * * * * * * * * * * * * *Search For Schedule Based on Boarding Date, Terminal From and Terminal To * * * * * * * * * * * * *
   *************************************************@SlideOne_Functions_Start****************************************************
   ******************************************************************************************************************************/
      getTerminals() {
        const terminalsArr = this.pmtTerminals.query() || [];
        if (terminalsArr.length > 0) {
          this.terminalFrom = terminalsArr;
          this.isTerminalLoading = false;
          return;
        }

        this.pmtTerminals.recordRetrieve('?sort=name&subsidiary=PMT').then(
            res => {
              this.terminalFrom = res.payload;
              this.isTerminalLoading = false;
            }
        ).catch(err => {
          this.isTerminalLoading = false;
          this.terminalFrom = [];
          this.utilitiesService.presentToast('We couldn\'t process your request', 3000);
          return;
        });
      }

      onSelectTerminalFrom(ev) {
        this.terminalTo = this.terminalFrom.filter(f => f.name !== ev.detail.value);
      }

      searchSchedule(slider: IonSlides) {
        if (!this.bookForm.controls.terminalFrom.valid ||
            !this.bookForm.controls.terminalTo.valid ||
            !this.bookForm.controls.departureDate.valid
        ) {
          this.utilitiesService.presentToast('Please enter all details', 3000);
          return;
        }

        this.isSearchingSchedule = true;
        const bDate = this.bookForm.controls.departureDate.value.split('T');
        const data = {
          terminalTo: this.bookForm.controls.terminalTo.value,
          terminalFrom: this.bookForm.controls.terminalFrom.value,
          boardingDate: bDate[0]
        };

        /************************SET SOME VALUE FOR RESERVATIONS STARTS****************************/
        this.reservationData.pmtTerminalFrom = data.terminalFrom;
        this.reservationData.customer = this.user.id;
        /************************SET SOME VALUE FOR RESERVATIONS ENDS****************************/


        this.loadingCtrl.create({
          spinner: 'dots'
        }).then(el => {
          el.present();
          this.pmtSchedules.recordRetrieve(`/reservation?boardingDate=${data.boardingDate}&pmtTerminalFrom=${data.terminalFrom}&pmtTerminalTo=${data.terminalTo}`)
              .then(res => {
                if (res.payload.length > 0) {
                  this.scheduleArr = res.payload;
                  this.isSearchingSchedule = false;
                  el.dismiss();
                  this.slideNext(slider);
                  return;
                }
                this.utilitiesService.presentToast('No Reservation Found', 3000);
                el.dismiss();
              }).catch(err => {
                el.dismiss();
                console.log(err);
              });
        });
      }
  /******************************************************************************************************************************
   * * * * * * * * * * * * * *Search For Schedule Based on Boarding Date, Terminal From and Terminal To * * * * * * * * * * * * *
   **************************************************@SlideOne_Functions_End*****************************************************
   ******************************************************************************************************************************/





  /******************************************************************************************************************************
   * * * * * * * * * * * * * * * * * * * * * Select Schedule Results From Slide One Search * * * * * * * * * * * ** * * * * * * *
   *************************************************@SlideTwo_Functions_Start****************************************************
   ******************************************************************************************************************************/
      selectSchedule(schedule: PmtSchedules, pmtRoute, slider: IonSlides) {
        this.reservations = schedule.pmtReservations;
        this.schedule = schedule;
        this.pmtRoute = pmtRoute;
        if (this.seats.length > 1) {
          this.seats = [];
        }

        /************************SET SOME VALUE FOR RESERVATIONS STARTS****************************/
        this.reservationData.pmtSchedule = this.schedule.id;
        this.reservationData.pmtRoute = pmtRoute.id;
        /************************SET SOME VALUE FOR RESERVATIONS ENDS****************************/

        this.generateSeats();
        this.slideNext(slider);
      }
  /******************************************************************************************************************************
   * * * * * * * * * * * * * * * * * * * * * Select Schedule Results From Slide One Search * * * * * * * * * * * ** * * * * * * *
   **************************************************@SlideTwo_Functions_End*****************************************************
   ******************************************************************************************************************************/





  /******************************************************************************************************************************
   * * * * * * * * * * * * * * * * * * * * * Select Seats Based on user selected Schedules * * * * * * * * * * * ** * * * * * * *
   *************************************************@SlideThree_Functions_Start**************************************************
   ******************************************************************************************************************************/
      toggleSeats(index: number) {
        const seat = this.seats[index];
        if (!seat.boarded && !seat.disabled) {
          seat.selected = !seat.selected;
        }
        this.selectedSeats = this.seats.filter(value => value.selected).map(value => value.label);
        this.bookForm.controls.seats.setValue(this.selectedSeats.length > 0 ? this.selectedSeats : null);

        /************************SET SOME VALUE FOR RESERVATIONS STARTS****************************/
        let fare = 0;
        switch (this.schedule.pmtVehicle.vehicleClass) {
          case 'first':
            fare = this.pmtRoute.fareClass1;
            break;
          default:
            fare = this.pmtRoute.fareClass2;
            break;
        }
        if (!this.schedule.pmtVehicle) {
          fare = this.pmtRoute.fareClass1;
        }
        this.reservationData.amount = this.bookForm.controls.seats.value ? (fare * this.bookForm.controls.seats.value.length) : null;
        this.reservationData.seatQuantity = this.bookForm.controls.seats.value ? this.bookForm.controls.seats.value.length : null;
        /************************SET SOME VALUE FOR RESERVATIONS ENDS****************************/
      }

      generateSeats() {
        let selected = [];
        this.reservations.forEach(value => {
          selected = selected.concat(value.seatPositions);
        });

        for (let label = 1; label <= this.schedule.pmtVehicle.seatingCapacity; label++) {
          this.seats.push({
            label,
            selected: false,
            boarded: selected.includes(label),
            disabled: false,
          });
        }
      }

      selectSeatsBtn(slider: IonSlides) {
        if (!this.bookForm.controls.seats.valid) {
          this.utilitiesService.presentToast('Please select a seat', 3000);
          return;
        }
        /************************SET SOME VALUE FOR RESERVATIONS STARTS****************************/
        this.reservationData.seatPositions = this.bookForm.controls.seats.value;
        /************************SET SOME VALUE FOR RESERVATIONS ENDS****************************/
        this.slideNext(slider);
      }
  /******************************************************************************************************************************
   * * * * * * * * * * * * * * * * * * * * * Select Seats Based on user selected Schedules * * * * * * * * * * * ** * * * * * * *
   *************************************************@SlideThree_Functions_Ends***************************************************
   ******************************************************************************************************************************/



  /******************************************************************************************************************************
   * * * * * * * * * * * * * * * * * * * Invoice Properties Displayed to User Before Payment* * * * * * * * * * * * * * * * * * *
   *************************************************@SlideFour_Functions_Start***************************************************
   ******************************************************************************************************************************/
      bookNow() {
        const paymentOptionsProps = {
          amount: this.reservationData.amount,
          user: this.user
        };

        this.modalCtrl.create({
          component: PaymentOptionsComponent,
          componentProps: paymentOptionsProps
        }).then(el => {
          el.present();
          el.onDidDismiss().then(res => {
            if (res.data) {
              if (res.data.status === 'pending' || res.data.status === 'success') {
                this.createReservation(res.data);
                return;
              }
              return;
            }
            return;
          });
        });
      }
  /******************************************************************************************************************************
   * * * * * * * * * * * * * * * * * * * Invoice Properties Displayed to User Before Payment* * * * * * * * * * * * * * * * * * *
   *************************************************@SlideFour_Functions_Ends****************************************************
   ******************************************************************************************************************************/


  /*****************************************************************************************************************************
   * * * * * * * * * * * * * * * * * * * * Create Reservations Based on value from Slides* * * * * * * * * * * * * * * * * * * *
   *******************************************@Create_Reservation_Functions_Start***********************************************
   *****************************************************************************************************************************/
      createReservation(paymentRef) {
        this.reservationData.paymentGateway = paymentRef.paymentGateway;
        this.reservationData.paymentMethod = paymentRef.paymentMethod;
        this.reservationData.trxref = paymentRef.trxref;
        this.reservationData.gateway.currency = 'NGN';
        this.loadingCtrl.create({
          spinner: 'dots'
        }).then(el => {
          el.present();
          this.pmtReservations.recordCreate(this.reservationData).then(res => {
            if (res.success) {
              const data = {
                title: 'Successfully Created!',
                msg: 'You have successfully reserved a seat'
              };
              this.bookForm.reset();
              this.resetBookings();
              this.utilitiesService.presentAlert(data.title, data.msg);
            }
            el.dismiss();
          }).catch(err => {
            const data = {
              title: 'Something went wrong!',
              msg: `${err}`
            };
            this.utilitiesService.presentAlert(data.title, data.msg);
            el.dismiss();
          });
        });
      }

      resetBookings() {
        this.slider.slideTo(0);
        this.slideIndex = 1;
        this.schedule = null;
        this.pmtRoute = null;
        this.reservationData = {
          amount: null,
          trxref: null,
          customer: null,
          pmtTerminalFrom: null,
          pmtSchedule: null,
          pmtRoute: null,
          seatQuantity: null,
          seatPositions: null,
          paymentMethod: null,
          paymentGateway: null,
          description: null,
          gateway: {
            currency: null
          }
        };
      }
  /*****************************************************************************************************************************
   * * * * * * * * * * * * * * * * * * * * Create Reservations Based on value from Slides* * * * * * * * * * * * * * * * * * * *
   *******************************************@Create_Reservation_Functions_Ends************************************************
   *****************************************************************************************************************************/
}
