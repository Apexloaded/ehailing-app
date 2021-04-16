import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingController, ModalController, NavParams} from '@ionic/angular';
import {AuthService} from '../../services';
import {Router} from '@angular/router';
import {ResetPasswordComponent} from '../reset-password/reset-password.component';
import {UtilitiesService} from '../../services/utilities.service';

@Component({
  selector: 'app-otp-form',
  templateUrl: './otp-form.component.html',
  styleUrls: ['./otp-form.component.scss'],
})
export class OtpFormComponent implements OnInit {
  otpForm: FormGroup;
  phoneOREmail: string;
  payload: any;

  constructor(
      private navParam: NavParams,
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private loadingCtrl: LoadingController,
      private modalCtrl: ModalController,
      private utilitiesService: UtilitiesService
  ) { }

  ngOnInit() {
    this.phoneOREmail = this.navParam.data.value;
    this.fields();
  }

  validateEmail(email: string) {
    const re = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
    return re.test(email);
  }

  fields() {
    this.otpForm = this.formBuilder.group({
      otp: new FormControl('', [
        Validators.required
      ]),
    });
  }

  async login() {
    if (!this.otpForm.controls.otp.valid) {
      this.utilitiesService.presentToast('Enter your otp', 3000);
      return;
    }

    this.payload = {
      phone: `${this.phoneOREmail}`,
      type: 'OTP',
      otp: `${this.otpForm.controls.otp.value}`
    };

    if (this.validateEmail(this.phoneOREmail)) {
      this.payload = {
        email: `${this.phoneOREmail}`,
        type: 'OTP',
        otp: `${this.otpForm.controls.otp.value}`
      };
    }

    this.loadingCtrl.create({
      spinner: 'dots'
    }).then(el => {
      el.present();
      this.authService.postLogin(this.payload).then(res => {
        el.dismiss();
        if (res.success) {
          this.modalCtrl.create({
            component: ResetPasswordComponent,
            componentProps: {
              type: 'forgot'
            }
          });
        }
      }).catch(err => {
        console.log(err);
        el.dismiss();
        this.utilitiesService.presentToast('Something went wrong', 4000);
      });
    });
  }

  returnBack() {
    this.modalCtrl.dismiss();
  }

}
