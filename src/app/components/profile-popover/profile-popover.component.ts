import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services';
import {ModalController, PopoverController} from '@ionic/angular';
import {ResetPasswordComponent} from '../reset-password/reset-password.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-popover',
  templateUrl: './profile-popover.component.html',
  styleUrls: ['./profile-popover.component.scss'],
})
export class ProfilePopoverComponent implements OnInit {

  constructor(
      protected authService: AuthService,
      private modalCtrl: ModalController,
      private popoverCtrl: PopoverController,
      private router: Router
  ) { }

  ngOnInit() {}

  logout() {
    this.popoverCtrl.dismiss();
    this.authService.userLogOut();
  }

  editProfile() {
    this.popoverCtrl.dismiss();
    this.router.navigateByUrl('/profile/edit');
  }
}
