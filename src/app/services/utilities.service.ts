import { Injectable } from '@angular/core';
import {AlertController, ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  constructor(
    private toast: ToastController,
    private alertCtrl: AlertController
  ) { }

  async presentToast(message, time) {
    const toast = await this.toast.create({
      message,
      duration: time,
      cssClass: 'toast',
      position: 'bottom'
    });
    toast.present();
  }

  async presentAlert(title, msg, func?, isRedirect?, url?) {
    const alert = await this.alertCtrl.create({
      header: `${title}`,
      message: `${msg}`,
      buttons: [
        {
          text: 'Okay',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

  async presentRedirectAlert(title, msg, func?) {
    const alert = await this.alertCtrl.create({
      header: `${title}`,
      message: `${msg}`,
      buttons: [
        {
          text: 'Okay',
          handler: func
        }
      ]
    });
    alert.present();
  }
}
