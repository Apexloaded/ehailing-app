import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IonSlides, LoadingController, ModalController} from '@ionic/angular';
import {LocationService} from '../../services/location.service';
import {retry} from 'rxjs/operators';
import {Coordinates, Customer, PAYMENT_METHOD, Terminal} from '../../models';
import {PmtPickups, Terminals} from '../../providers';
import {StorageService, UtilitiesService} from '../../services';
import {PaymentOptionsComponent} from "../../components/payment-options/payment-options.component";
import {PickupDetailsComponent} from "../../components/pickup-details/pickup-details.component";

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.page.html',
  styleUrls: ['./pickup.page.scss'],
})
export class PickupPage implements OnInit {
  public pmtPickupArr = [];
  public isPickupLoading: boolean;
  public segment = 0;
  public isLoading: boolean;
  public user: Customer;
  public sliderOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400,
    direction: 'horizontal',
    centeredSlides: true,
    spaceBetween: 1
  };

  public coords: Coordinates = {
    lat: null,
    lng: null
  };

  public selectedSlides: any;
  public reqForm: FormGroup;

  public error = {
    isError: null,
    icon: null,
    title: null,
    message: null
  };

  public isSearchingLocation: boolean;
  public isLocationPicked: boolean;

  public isTerminalLoading: boolean;
  public terminalTo: Array<Terminal>;

  constructor(
      private fb: FormBuilder,
      private locationService: LocationService,
      private pmtTerminals: Terminals,
      private utilitiesService: UtilitiesService,
      private pmtPickups: PmtPickups,
      private loadCtrl: LoadingController,
      private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.user = StorageService.getItem('user');
    this.isTerminalLoading = true;
    this.isLocationPicked = true;
    this.isLocationPicked = false;
    this.getTerminals();
    this.buildForm();
    this.getPickupHistory();
  }

  buildForm() {
    this.reqForm = this.fb.group({
      amount: new FormControl(1000, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      seat: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      address: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      terminal: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });
  }

  async segmentChanged(ev) {
    await this.selectedSlides.slideTo(this.segment);
  }

  async slidesChange(slides: IonSlides) {
    this.selectedSlides = slides;
    slides.getActiveIndex().then(selectedIndex => {
      this.segment = selectedIndex;
    });
  }

  getPickupHistory() {
    this.pmtPickups.recordRetrieve(`?customer=${this.user.id}&populate=pmtTerminal&sort=-createdAt`).then(res => {
      if (res.success) {
        this.isPickupLoading = false;
        this.pmtPickupArr = res.payload;
        console.log(this.pmtPickupArr);
        return;
      }
      this.isPickupLoading = false;
    }).catch(err => {
      this.isPickupLoading = false;
      this.error.isError = true;
      this.error.icon = 'alert-outline';
      this.error.title = 'An Error Occurred!';
      this.error.message = 'We couldn\'t retrieve your pickup records, please pull down to try again.';
    });
  }

  getTerminals() {
    const terminalsArr = this.pmtTerminals.query() || [];
    if (terminalsArr.length > 0) {
      this.terminalTo = terminalsArr;
      this.isTerminalLoading = false;
      return;
    }

    this.pmtTerminals.recordRetrieve('?sort=name&subsidiary=PMT').then(
        res => {
          this.terminalTo = res.payload;
          this.isTerminalLoading = false;
        }
    ).catch(err => {
      this.isTerminalLoading = false;
      this.terminalTo = [];
      this.utilitiesService.presentToast('We couldn\'t process your request', 3000);
      return;
    });
  }

  getCurrentLocation() {
    this.isSearchingLocation = true;
    this.locationService.getCoords.pipe(
        retry(3),
    ).subscribe(
        res => {
          if (res) {
            this.coords.lat = res.lat;
            this.coords.lng = res.lng;
            this.isSearchingLocation = false;
            this.isLocationPicked = true;
            this.utilitiesService.presentToast('Location Picked!', 3000);
          }
        },
        err => {
          this.isLocationPicked = false;
          this.utilitiesService.presentToast('Something went wront, please try and select again!', 3000);
        }
    );
  }

  requestPickup() {
    if (this.coords.lat === null || this.coords.lng === null) {
      this.utilitiesService.presentToast('Please click the pick location button to pick your location', 3000);
      return;
    }

    if (!this.reqForm.valid) {
      this.utilitiesService.presentToast('Please fill in all fields', 3000);
      return;
    }

    const data = {
      location: {
        type: 'Point',
        coordinates: [this.coords.lng, this.coords.lat]
      },
      pmtTerminal: this.reqForm.controls.terminal.value,
      seatQuantity: this.reqForm.controls.seat.value,
      address: this.reqForm.controls.address.value,
      customer: this.user.id,
    };

    const paymentOptionsProps = {
      amount: this.reqForm.controls.amount.value,
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
            this.createPickup(res.data, data);
          }
          return;
        }
        return;
      });
    });
  }

  viewPickup(pickup) {
    if (pickup.paymentStatus === 'PENDING') {
      this.pmtPickups.recordRetrieve(`/verify/${pickup.code}`).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
      return;
    }
    this.modalCtrl.create({
      component: PickupDetailsComponent,
      componentProps: pickup
    }).then(el => {
      el.present();
    });
  }

  private createPickup(paymentRef, pickupPayload) {
    const data = {
      paymentMethod: paymentRef.paymentMethod,
      paymentGateway: paymentRef.paymentGateway,
      trxref: paymentRef.trxref,
      amount: 5000,
      gateway: {
        currency: 'NGN'
      },
      ...pickupPayload
    };

    this.loadCtrl.create({
      spinner: 'dots',
      message: 'requesting pickup'
    }).then(el => {
      el.present().then(() => {
        this.pmtPickups.recordCreate(data).then(res => {
          el.dismiss().then(() => {
            if (res.success) {
              this.isLocationPicked = false;
              this.reqForm.reset();
              this.utilitiesService.presentToast('Pickup Requested Created!', 3000);
            }
          });
        }).catch(err => {
          el.dismiss().then(() => {
            this.utilitiesService.presentToast('An error occurred, please try again', 4000);
          });
        });
      });
    });
  }

  doRefresh(ev) {
    setTimeout(() => {
      this.getPickupHistory();
      ev.target.complete();
    }, 2000);
  }

}
