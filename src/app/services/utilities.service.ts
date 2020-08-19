import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  constructor(
    private toast: ToastController
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
}
