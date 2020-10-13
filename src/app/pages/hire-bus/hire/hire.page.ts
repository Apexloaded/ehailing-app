import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMapService } from '../../../services';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-hire',
  templateUrl: './hire.page.html',
  styleUrls: ['./hire.page.scss'],
})
export class HirePage implements OnInit {
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

  constructor(
      private geolocation: Geolocation,
      private googleMapService: GoogleMapService,
      private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.autocomplete = {input: ''};
    this.autocompleteItems = [];
    this.buildForm();
    this.initGeolocation();
  }

  buildForm() {
    this.hireForm = this.fb.group({
      locationFrom: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      locationTo: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
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
    if (this.hireForm.controls.locationFrom.valid) {
      this.autocomplete.input = this.hireForm.controls.locationFrom.value;
    }
    this.autoCompleteFunction();
  }

  autoCompleteFunction() {
    this.googleAutoComplete.getQueryPredictions({input: this.hireForm.controls.locationFrom.value},
        (predictions, status) => {
          this.autocompleteItems = [];
          if (status === 'OK') {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          }
        });
  }

  selectSearchResult(prediction) {
    this.placeId = prediction.place_id;
    this.getDetailsById();
  }

  getDetailsById() {
    this.autocompleteItems = [];
    const request = {
      placeId: this.placeId
    };
    this.googleGeoCoder.geocode(request, (result, status) => {
      console.log(result[0].geometry.location.lat());
      console.log(result[0].geometry.location.lng());
    });
  }

}
