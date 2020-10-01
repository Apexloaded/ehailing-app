import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController, NavParams} from '@ionic/angular';
import {PmtPickups} from '../../providers';

@Component({
  selector: 'app-pickup-details',
  templateUrl: './pickup-details.component.html',
  styleUrls: ['./pickup-details.component.scss'],
})
export class PickupDetailsComponent implements OnInit {
  public pickup;
  constructor(
      private modalCtrl: ModalController,
      private navParams: NavParams,
      private pmtPickup: PmtPickups,
      private loadCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.pickup = this.navParams.data;
  }

  sendPickup(pickup) {
    this.loadCtrl.create({
      spinner: 'dots'
    }).then(el => {
      el.present().then(() => {
        const payload = {
          operation: 'PICKEDUP'
        };
        this.pmtPickup.recordUpdate(pickup, payload).then(res => {
          console.log(res);
          el.dismiss();
        });
      });
    });
  }

  cancelPickup(pickup) {
    this.loadCtrl.create({
      spinner: 'dots'
    }).then(el => {
      el.present().then(() => {
        const payload = {
          operation: 'CANCEL'
        };
        this.pmtPickup.recordUpdate(pickup, payload).then(res => {
          this.pickup.status = 'CANCEL';
          el.dismiss();
        });
      });
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
