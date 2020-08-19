import { Component, OnInit } from '@angular/core';
import {Customer} from '../../models';
import {ActivatedRoute, Router} from '@angular/router';
import {PreviousRouteService} from '../../services/previous-route.service';
import {PopoverController} from '@ionic/angular';
import {AuthService} from '../../services';
import {UtilitiesService} from '../../services/utilities.service';
import {ProfilePopoverComponent} from '../../components/profile-popover/profile-popover.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public previousRoute: string;
  public user: Customer;
  public isLoading: boolean;

  constructor(
      private router: Router,
      private prevRoute: PreviousRouteService,
      private popoverCtrl: PopoverController,
      private authService: AuthService,
      private activatedRoute: ActivatedRoute,
      private utilitiesService: UtilitiesService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.getUserDetails();
  }

  returnBack(prevRoute) {
    this.router.navigateByUrl(prevRoute);
  }

  getUserDetails() {
    this.authService.getUser().then(res => {
      this.isLoading = false;
      this.user = res;
    }).catch(err => {
      this.activatedRoute.paramMap.subscribe(paramMap => {
        if (!paramMap.has('id')) {
          return;
        }
        const userId = paramMap.get('id');
        this.authService.retrieveCustomer(userId).then(res => {
          this.user = res;
          this.isLoading = false;
        }).catch(error => {
          this.isLoading = false;
          this.utilitiesService.presentToast('We could not process your request', 3000);
        });
      });
    });
  }

  ionViewWillEnter() {
    this.previousRoute = '/home';
    this.getUserDetails();
  }

  gotoRoute(prevRoute) {
    this.router.navigateByUrl(`${prevRoute}`);
  }

  async openModal(ev) {
    const popover = await this.popoverCtrl.create({
      component: ProfilePopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

}
