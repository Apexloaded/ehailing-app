import { Component, OnInit } from '@angular/core';
import {PreviousRouteService} from '../../../services/previous-route.service';
import {Customer} from '../../../models';
import {EditProfileComponent} from '../../../components/edit-profile/edit-profile.component';
import {AuthService} from '../../../services';
import {ModalController} from '@ionic/angular';
import {ResetPasswordComponent} from '../../../components/reset-password/reset-password.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  public previousRoute: string;
  public user: Customer;
  public isLoading: boolean;

  constructor(
      private prevRoute: PreviousRouteService,
      private authService: AuthService,
      private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.getUserDetails();
  }

  getUserDetails() {
    this.authService.getUser().then(user => {
      this.user = user;
      this.isLoading = false;
    });
  }

  ionViewWillEnter() {
    this.getUserDetails();
    this.previousRoute = this.prevRoute.getPreviousRoute;
    if (this.previousRoute !== null && !this.previousRoute.includes('/profile/edit')) {
      return;
    }
    this.previousRoute = '/profile';
  }

  editName() {
    this.presentPopover('edit-name');
  }

  editEmail() {
    this.presentPopover('edit-email');
  }

  mobilePhone() {
    this.presentPopover('mobile-phone');
  }

  homePhone() {
    this.presentPopover('home-phone');
  }

  contactPerson() {
    this.presentPopover('contact-person');
  }

  resetPassword() {
    this.modalCtrl.create({
      component: ResetPasswordComponent,
      componentProps: {
        isForgot: false
      }
    }).then(el => {
      el.present();
    });
  }

  presentPopover(type) {
    this.modalCtrl.create({
      component: EditProfileComponent,
      componentProps: {
        type: `${type}`
      }
    }).then(el => {
      el.present();
    });
  }

}
