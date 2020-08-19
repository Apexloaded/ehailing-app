import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController, NavParams} from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services';
import {Router} from '@angular/router';
import {Customer} from '../../models';
import {UtilitiesService} from "../../services/utilities.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  public resetForm: FormGroup;
  public isForgot: boolean;
  public user: Customer;

  constructor(
      private navParam: NavParams,
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private utilitiesService: UtilitiesService,
      private router: Router,
      private loadingCtrl: LoadingController,
      private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.isForgot = this.navParam.data.isForgot;
    this.fields();
    this.authService.getUser().then(res => {
      this.user = res;
    }).catch(err => {
      this.utilitiesService.presentToast('We could not process your request', 3000);
    });
  }

  fields() {
    this.resetForm = this.formBuilder.group({
      oldPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8), Validators.maxLength(100)
      ]),
      password1: new FormControl('', [
        Validators.required,
        Validators.minLength(8), Validators.maxLength(100)
      ]),
      password2: new FormControl('', [
        Validators.required,
        Validators.minLength(8), Validators.maxLength(100)
      ]),
    });
  }

  async login() {
    if (!this.resetForm.controls.password1.valid) {
      this.utilitiesService.presentToast('Enter your password. Password length must not be less than 8', 3000);
      return;
    }

    if (!this.resetForm.controls.password2.valid) {
      this.utilitiesService.presentToast('Please confirm your password. Password length must not be less than 8', 3000);
      return;
    }

    if (this.resetForm.controls.password2.value !== this.resetForm.controls.password1.value) {
      this.utilitiesService.presentToast('Password mismatch!', 3000);
      return;
    }

    const payload = {
      password: `${this.resetForm.controls.password1.value}`,
      id: this.user.id
    };

    this.loadingCtrl.create({
      spinner: 'dots',
      message: 'Resetting Password'
    }).then(el => {
      el.present();
      this.authService.resetPassword(payload).then(res => {
        el.dismiss();
        if (res.success) {
          this.utilitiesService.presentToast('Password Reset Completed', 3000);
          this.resetForm.reset();
          return;
        }
      }).catch(err => {
        el.dismiss();
        this.utilitiesService.presentToast('Something went wrong', 3000);
      });
    });
  }

  returnBack() {
    this.modalCtrl.dismiss();
  }

}
