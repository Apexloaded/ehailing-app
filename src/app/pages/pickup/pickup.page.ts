import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IonSlides} from "@ionic/angular";
import {LocationService} from "../../services/location.service";

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.page.html',
  styleUrls: ['./pickup.page.scss'],
})
export class PickupPage implements OnInit {
  public segment = 0;
  public isLoading: boolean;
  public sliderOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400,
    direction: 'horizontal',
    centeredSlides: true,
    spaceBetween: 1
  };

  public selectedSlides: any;
  // public reqForm: FormGroup;

  public error = {
    isError: null,
    icon: null,
    title: null,
    message: null
  };

  constructor(
      private fb: FormBuilder,
      private locationService: LocationService
  ) { }

  ngOnInit() {
    this.getCurrentLocation();
  }

  // buildForm() {
  //   this.reqForm = this.fb.group({
  //     surname: new FormControl(null, {
  //       updateOn: 'change',
  //       validators: [Validators.required]
  //     }),
  //     otherName: new FormControl(null, {
  //       updateOn: 'change',
  //       validators: [Validators.required]
  //     })
  //   });
  // }

  async segmentChanged(ev) {
    await this.selectedSlides.slideTo(this.segment);
  }

  async slidesChange(slides: IonSlides) {
    this.selectedSlides = slides;
    slides.getActiveIndex().then(selectedIndex => {
      this.segment = selectedIndex;
    });
  }

  getCurrentLocation() {
    const cords = this.locationService.getCoords();
    console.log(cords);
  }

}
