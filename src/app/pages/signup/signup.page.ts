import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services';
import {Router} from '@angular/router';
import {IonSlides, LoadingController} from '@ionic/angular';
import {PreviousRouteService} from '../../services/previous-route.service';
import {UtilitiesService} from '../../services/utilities.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public previousRoute: string;
  slideOne: FormGroup;
  slideTwo: FormGroup;

  public sliderOpt = {
    initialSlide: 0,
    slidePerView: 1
  };

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private loadingCtrl: LoadingController,
      private prevRoute: PreviousRouteService,
      private utilitiesService: UtilitiesService
  ) { }

  ngOnInit() {
    this.slideOneForm();
    this.slideTwoForm();
  }

  ionViewWillEnter() {
    this.previousRoute = this.prevRoute.getPreviousRoute;
    if (this.previousRoute !== null &&
        !this.previousRoute.includes('/signup') &&
        !this.previousRoute.includes('/reset-password')
    ) {
      return;
    }
    this.previousRoute = '/welcome';
  }

  validateEmail(email: string) {
    const re = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
    return re.test(email);
  }

  phoneValidation(phone: string) {
    const re = /^[0][0-9]/;
    return re.test(phone);
  }

  slideOneForm() {
    this.slideOne = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(8), Validators.maxLength(100)
      ]),
      password: new FormControl('', [
          Validators.required,
          Validators.minLength(5)
      ]),
      c_password: new FormControl(null, [
          Validators.required,
          Validators.minLength(5)
      ])
    });
  }

  slideTwoForm() {
    this.slideTwo = this.formBuilder.group({
      title: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      otherName: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required])
    });
  }

  verifySlideOne(slider) {
    if (!this.slideOne.valid) {
      this.utilitiesService.presentToast('Fill in all fields correctly', 3000);
      return;
    }

    if (this.slideOne.controls.password.value !== this.slideOne.controls.c_password.value) {
      this.utilitiesService.presentToast('Password mismatch', 3000);
      return;
    }
    this.slideNext(slider);
  }

  signUp() {
    if (!this.slideOne.valid || !this.slideTwo.valid) {
      this.utilitiesService.presentToast('Please fill in all fields correctly', 3000);
      return;
    }

    const data: any = {
      customerType: 'INDIVIDUAL',
      title: this.slideTwo.controls.title.value,
      surname: this.slideTwo.controls.surname.value,
      otherName: this.slideTwo.controls.otherName.value,
      gender: this.slideTwo.controls.gender.value,
      country: this.slideTwo.controls.country.value,
      password: this.slideOne.controls.password.value,
      isPmlClient: true
    };

    if (this.validateEmail(this.slideOne.controls.username.value)) {
      data.email = this.slideOne.controls.username.value;
    }

    if (this.phoneValidation(this.slideOne.controls.username.value)) {
      data.phone = this.slideOne.controls.username.value;
    }

    console.log(data);

  }

  returnBack(url: string, slider: IonSlides) {
    slider.getActiveIndex().then(res => {
      if (res === 0) {
        this.router.navigateByUrl(`${url}`);
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
  }

  prevSlide(slide: IonSlides) {
    if (slide) {
      slide.lockSwipes(false);
    }
    slide.slidePrev();
  }

}
