import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services';
import {ModalController} from '@ionic/angular';
import {OtpFormComponent} from '../../components/otp-form/otp-form.component';
import {UtilitiesService} from '../../services/utilities.service';
import {PreviousRouteService} from '../../services/previous-route.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  public previousRoute: string;
  public resetForm: FormGroup;
  public resetPasswordData: any;

  constructor(
      private router: Router,
      private fb: FormBuilder,
      private authService: AuthService,
      private modalCtrl: ModalController,
      private utilitiesService: UtilitiesService,
      private prevRoute: PreviousRouteService,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  ionViewWillEnter() {
    this.previousRoute = this.prevRoute.getPreviousRoute;
    if (this.previousRoute !== null && !this.previousRoute.includes('/reset-password')) {
      return;
    }
    this.previousRoute = '/welcome';
  }

  validateEmail(email: string) {
    const re = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
    return re.test(email);
  }

  buildForm() {
    this.resetForm = this.fb.group({
      value: new FormControl(null,{
        updateOn: 'change',
        validators: [Validators.required]
      })
    });
  }

  reset() {
    if (!this.resetForm.valid) {
      this.utilitiesService.presentToast('Enter your email or phone number', 3000);
      return;
    }

    this.resetPasswordData = {
      phone: `${this.resetForm.controls.value.value}`
    };

    if (this.validateEmail(this.resetForm.controls.value.value)) {
      this.resetPasswordData = {
        email: `${this.resetForm.controls.value.value}`
      };
    }

    this.authService.getOtp(this.resetPasswordData).subscribe(
        res => {
          if (res.success) {
            this.modalCtrl.create({
              component: OtpFormComponent,
              componentProps: {
                value: `${this.resetForm.controls.value.value}`
              }
            }).then(el => {
              el.present();
            });
          }
        },
        err => {
          this.utilitiesService.presentToast('Something went wrong, please try again', 3000);
        }
    );
  }

  returnBack(url) {
    console.log(url);
    this.router.navigateByUrl(`${url}`);
  }

}
