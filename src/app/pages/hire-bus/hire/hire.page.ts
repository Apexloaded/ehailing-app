import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {GoogleMapService, StorageService, UtilitiesService} from '../../../services';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../../../models';
import {PaymentOptionsComponent} from '../../../components/payment-options/payment-options.component';
import {LoadingController, ModalController} from '@ionic/angular';
import {PmtHiring, Terminals} from '../../../providers';

@Component({
  selector: 'app-hire',
  templateUrl: './hire.page.html',
  styleUrls: ['./hire.page.scss'],
})
export class HirePage implements OnInit {
  @ViewChild('arrivalDate') returnDateEl: ElementRef;

  public hireForm: FormGroup;
  public event = {
    startDate: new Date( new Date().getTime() + 1000 * 60 * 60 * 24).toISOString(),
    endDate: new Date( new Date().getTime() + 1000 * 60 * 60 * 24 * 3).toISOString()
  };

  public autocomplete: { input: string; };
  public autocompleteItems: any[];
  public googleAutoComplete: any;
  public googleGeoCoder: any;
  public placeId: any;
  public isInput = {
    locationFrom: false,
    locationTo: false,
    autoCompleteDone: false
  };

  public vehicleType = [
    {name: 'BUS'},
    {name: 'CAR'},
    {name: 'TAXI'},
    {name: 'KEKE'},
    {name: 'BIKE'},
    {name: 'JEEP'}
  ];

  public terminalFrom = [];
  public terminalTo = [];
  public isTerminalLoading: boolean;

  public user: Customer;

  pmtHiring = {
    type: null,
    tripType: null,
    departureDate: null,
    returnDate: null,
    actualCharge: null,
    pmtVehicleType: null,
    customer: null,
    paymentStatus: null,
    paymentMethod: null,
    paymentGateway: null,
    longitudeFrom: null,
    longitudeTo: null,
    latitudeFrom: null,
    latitudeTo: null,
    description: null,
    pmtTerminalTo: null,
    pmtTerminalFrom: null,
    vehicleType: null
  };


  constructor(
      private geolocation: Geolocation,
      private googleMapService: GoogleMapService,
      private fb: FormBuilder,
      private utilitiesService: UtilitiesService,
      private modalCtrl: ModalController,
      private pmtHiringService: PmtHiring,
      private loadCtrl: LoadingController,
      private pmtTerminals: Terminals
  ) { }

  ngOnInit() {
    this.isTerminalLoading = true;
    this.user = StorageService.getItem('user');
    this.autocomplete = {input: ''};
    this.autocompleteItems = [];
    this.buildForm();
    this.initGeolocation();
    this.getTerminals();
  }

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

  buildForm() {
    this.hireForm = this.fb.group({
      amount: new FormControl('20000', {
        updateOn: 'change'
      }),
      locationFrom: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      locationTo: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      hiringType: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      vehicleType: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      terminalFrom: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      terminalTo: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      rentType: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      departureDate: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      returnDate: new FormControl('', {
        updateOn: 'change'
      }),
      description: new FormControl('', {
        updateOn: 'change'
      })
    });
  }

  initGeolocation() {
    this.googleMapService.init().then(googleMaps => {
      this.googleAutoComplete = new googleMaps.places.AutocompleteService();
      this.googleGeoCoder = new googleMaps.Geocoder();
    });
  }

  updateLocationFrom() {
    this.isInput.locationFrom = true;
    this.isInput.locationTo = false;
    if (this.hireForm.controls.locationFrom.valid) {
      this.autocomplete.input = this.hireForm.controls.locationFrom.value;
    }
    this.autoCompleteFunction();
  }

  updateLocationTo() {
    this.isInput.locationFrom = false;
    this.isInput.locationTo = true;
    if (this.hireForm.controls.locationTo.valid) {
      this.autocomplete.input = this.hireForm.controls.locationTo.value;
    }
    this.autoCompleteFunction();
  }

  autoCompleteFunction() {
    if (!this.isInput.autoCompleteDone) {
      try {
        this.googleAutoComplete.getQueryPredictions({input: this.autocomplete.input},
            (predictions, status) => {
              this.autocompleteItems = [];
              if (status === 'OK') {
                predictions.forEach((prediction) => {
                  this.autocompleteItems.push(prediction);
                });
              }
            });
      } catch (err) {
        console.log(err);
      }
    }
  }

  selectSearchResult(prediction) {
    this.autocomplete.input = '';
    this.autocompleteItems = [];
    this.placeId = prediction.place_id;

    if (this.isInput.locationFrom) {
      this.hireForm.controls.locationFrom.setValue(`${prediction.description}`);
      this.getDetailsById('locationFrom', prediction.place_id);
    } else if (this.isInput.locationTo) {
      this.hireForm.controls.locationTo.setValue(`${prediction.description}`);
      this.getDetailsById('locationTo', prediction.place_id);
    }
  }

  /*************************************************************************************************
   ****************************************@pmtHiringLatitude***************************************
   ****************************************@omtHiringLongitude**************************************
   *************************************************************************************************/
  getDetailsById(type: string, predicationId: string) {
    const request = {
      placeId: predicationId
    };
    this.googleGeoCoder.geocode(request, (result, status) => {
      if (status === 'OK') {
        if (type === 'locationFrom') {
          this.pmtHiring.latitudeFrom = result[0].geometry.location.lat();
          this.pmtHiring.longitudeFrom = result[0].geometry.location.lng();
        } else if (type === 'locationTo') {
          this.pmtHiring.latitudeTo = result[0].geometry.location.lat();
          this.pmtHiring.longitudeTo = result[0].geometry.location.lng();
        }
      }
    });
    if (this.hireForm.valid) {
      this.isInput.autoCompleteDone = true;
    }
  }

  selectRentType(returnDateRef, event) {
    if (event.detail.value === 'TWO_WAY') {
      returnDateRef.el.classList.remove('hidden');
      this.hireForm.controls.returnDate.setValidators([Validators.required]);
    } else if (event.detail.value === 'ONE_WAY') {
      returnDateRef.el.classList.add('hidden');
      this.hireForm.controls.returnDate.setValidators(null);
    }
    this.hireForm.controls.returnDate.updateValueAndValidity();
  }

  hireBtn() {
    if (!this.hireForm.valid) {
      this.utilitiesService.presentToast('Please fill up all fields', 3000);
      return;
    }

    this.pmtHiring.customer = this.user.id;
    this.pmtHiring.departureDate = this.hireForm.controls.departureDate.value;
    this.pmtHiring.returnDate = this.hireForm.controls.returnDate.value;
    this.pmtHiring.description = this.hireForm.controls.description.value;
    this.pmtHiring.type = this.hireForm.controls.hiringType.value;
    this.pmtHiring.tripType = this.hireForm.controls.rentType.value;
    this.pmtHiring.actualCharge = this.hireForm.controls.amount.value;
    this.pmtHiring.vehicleType = this.hireForm.controls.vehicleType.value;
    this.pmtHiring.pmtTerminalFrom = this.hireForm.controls.terminalFrom.value;
    this.pmtHiring.pmtTerminalTo = this.hireForm.controls.terminalTo.value;

    const paymentOptionsProps = {
      amount: this.pmtHiring.actualCharge,
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
            this.createHiringRequest(res.data);
          }
          return;
        }
        return;
      });
    });
  }

  createHiringRequest(paymentRef) {
    this.pmtHiring.paymentMethod = paymentRef.paymentMethod;
    this.pmtHiring.paymentGateway = paymentRef.paymentGateway;

    this.loadCtrl.create({
      spinner: 'dots',
      message: 'Request in progress...'
    }).then(el => {
      el.present().then(() => {
        this.pmtHiringService.recordCreate(this.pmtHiring).then(res => {
          el.dismiss().then(() => {
            if (res.success) {
              this.hireForm.reset();
              this.utilitiesService.presentToast('Requested Successfully Completed!', 3000);
            }
          });
        }).catch(err => {
          console.log(err);
          el.dismiss().then(() => {
            this.utilitiesService.presentToast('An error occurred, please try again', 4000);
          });
        });
      });
    });
  }

}
