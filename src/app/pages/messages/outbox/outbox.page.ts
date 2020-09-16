import { Component, OnInit } from '@angular/core';
import { CreateMessageComponent } from '../../../components/create-message/create-message.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.page.html',
  styleUrls: ['./outbox.page.scss'],
})
export class OutboxPage implements OnInit {

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
