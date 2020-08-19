import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController, NavParams} from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../../models';
import {AuthService} from '../../services';
import {UtilitiesService} from '../../services/utilities.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  public type: string;
  public editName: FormGroup;
  public editEmail: FormGroup;
  public editMobile: FormGroup;
  public editHome: FormGroup;
  public editContactPerson: FormGroup;
  public user: Customer;
  public isLoading: boolean;

  constructor(
      private modalCtrl: ModalController,
      private navParams: NavParams,
      private fb: FormBuilder,
      private authService: AuthService,
      private loadingCtrl: LoadingController,
      private utilitiesService: UtilitiesService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.authService.getUser().then(user => {
      this.user = user;
      this.type = this.navParams.data.type;
      switch (this.type) {
        case 'edit-name':
          this.buildEditName(user, true);
          break;
        case 'edit-email':
          this.buildEditEmail(user, true);
          break;
        case 'mobile-phone':
          this.buildEditMobile(user, true);
          break;
        case 'home-phone':
          this.buildEditHomePhone(user, true);
          break;
        case 'contact-person':
          this.buildEditContactPerson(user, true);
          break;
      }
    });
  }

  buildEditName(value: Customer, isBuild: boolean) {
    if (isBuild) {
      this.editName = this.fb.group({
        surname: new FormControl(value.surname, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        otherName: new FormControl(value.otherName, {
          updateOn: 'change',
          validators: [Validators.required]
        })
      });
      this.isLoading = false;
      return;
    }

    if (!this.editName.valid) {
      this.utilitiesService.presentToast('Please fill in all fields', 3000);
      return;
    }

    const data = {
      surname: `${this.editName.controls.surname.value}`,
      otherName: `${this.editName.controls.otherName.value}`
    };

    this.sendReq(data, value.id);
  }

  buildEditEmail(value: Customer, isBuild: boolean) {
    if (isBuild) {
      this.editEmail = this.fb.group({
        email: new FormControl(value.email, {
          updateOn: 'change',
          validators: [Validators.required, Validators.email]
        })
      });
      this.isLoading = false;
      return;
    }

    if (!this.editEmail.valid) {
      this.utilitiesService.presentToast('Please enter your email address', 3000);
      return;
    }

    const data = {
      email: `${this.editEmail.controls.email.value}`
    };

    this.sendReq(data, value.id);
  }

  buildEditMobile(value: Customer, isBuild: boolean) {
    if (isBuild) {
      this.editMobile = this.fb.group({
        mobile: new FormControl(value.phone, {
          updateOn: 'change',
          validators: [Validators.required]
        })
      });
      this.isLoading = false;
      return;
    }

    if (!this.editMobile.valid) {
      this.utilitiesService.presentToast('Please enter your mobile phone number', 3000);
      return;
    }

    const data = {
      phone: `${this.editMobile.controls.mobile.value}`
    };

    this.sendReq(data, value.id);
  }

  buildEditHomePhone(value: Customer, isBuild: boolean) {
    if (isBuild) {
      this.editHome = this.fb.group({
        home: new FormControl(value.phoneHome, {
          updateOn: 'change',
          validators: [Validators.required]
        })
      });
      this.isLoading = false;
      return;
    }

    if (!this.editHome.valid) {
      this.utilitiesService.presentToast('Please enter your home phone number', 3000);
      return;
    }

    const data = {
      phoneHome: `${this.editHome.controls.home.value}`,
    };

    this.sendReq(data, value.id);
  }

  buildEditContactPerson(value: Customer, isBuild: boolean) {
    if (isBuild) {
      this.editContactPerson = this.fb.group({
        contactPerson: new FormControl(value.contactPerson, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        contactPersonPhone: new FormControl(value.contactPersonPhone, {
          updateOn: 'change',
          validators: [Validators.required, Validators.maxLength(11)]
        })
      });
      this.isLoading = false;
      return;
    }

    if (!this.editContactPerson.valid) {
      this.utilitiesService.presentToast('Please fill in all field\'s', 3000);
      return;
    }

    const data = {
      contactPerson: `${this.editContactPerson.controls.contactPerson.value}`,
      contactPersonPhone: `${this.editContactPerson.controls.contactPersonPhone.value}`
    };

    this.sendReq(data, value.id);
  }

  presentLoader() {
    return this.loadingCtrl.create({
      spinner: 'dots',
      message: 'updating...'
    });
  }

  sendReq(data, id) {
    this.presentLoader().then(el => {
      el.present();
      this.authService.updateUser(data, id).then(res => {
        el.dismiss();
        if (res.success) {
          this.utilitiesService.presentToast('Update successful', 3000);
          this.isLoading = false;
          return;
        }
        this.utilitiesService.presentToast('We couldn\'t process your request', 3000);
      }).catch(err => {
        el.dismiss();
        this.isLoading = false;
        this.utilitiesService.presentToast('An error occurred, please try again', 3000);
      });
    });
  }

  returnBack() {
    this.modalCtrl.dismiss();
  }

  updateBtn() {
    switch (this.type) {
      case 'edit-name':
        this.buildEditName(this.user, false);
        break;
      case 'edit-email':
        this.buildEditEmail(this.user, false);
        break;
      case 'mobile-phone':
        this.buildEditMobile(this.user, false);
        break;
      case 'home-phone':
        this.buildEditHomePhone(this.user, false);
        break;
      case 'contact-person':
        this.buildEditContactPerson(this.user, false);
        break;
    }
  }

}
