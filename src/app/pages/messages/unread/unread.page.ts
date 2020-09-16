import { Component, OnInit } from '@angular/core';
import {CreateMessageComponent} from '../../../components/create-message/create-message.component';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-unread',
  templateUrl: './unread.page.html',
  styleUrls: ['./unread.page.scss'],
})
export class UnreadPage implements OnInit {

  constructor(
      private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  createMsg() {
    this.modalCtrl.create({
      component: CreateMessageComponent
    }).then(el => {
      el.present();
    });
  }

}
