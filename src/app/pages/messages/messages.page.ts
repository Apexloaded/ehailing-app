import { Component, OnInit } from '@angular/core';
import { PmtMail } from '../../providers';
import { Customer } from '../../models';
import { AuthService } from '../../services';
import { ModalController } from '@ionic/angular';
import { CreateMessageComponent } from '../../components/create-message/create-message.component';
import { SupportService } from '../../services/support.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  public user: Customer;
  public customerMail = [];
  public isLoading: boolean;

  public error = {
    isError: null,
    icon: null,
    title: null,
    message: null
  };

  constructor(
      private mailProvider: PmtMail,
      private authService: AuthService,
      private modalCtrl: ModalController,
      private supportService: SupportService
  ) {
    this.authService.getUser().then(res => {
      this.user = res;
      this.getMails(this.user);
    });
  }

  ngOnInit() {
    this.isLoading = true;
  }

  getMails(customer: Customer) {
    // const inboxArray = this.supportService.inboxMail() ? this.supportService.inboxMail() : [];
    // if (inboxArray.length > 0) {
    //   this.isLoading = false;
    //   this.customerMail = inboxArray;
    //   return;
    // }
    this.mailProvider.recordRetrieve(`?recipientId=${customer.id}&sender=STAFF&box=INBOX&sort=-createdAt`).then(res => {
      if (res.success) {
        this.isLoading = false;
        console.log(res.payload);
        this.customerMail = res.payload;
        return;
      }
    }).catch(err => {
      this.isLoading = false;
      this.error.isError = true;
      this.error.icon = 'alert-outline';
      this.error.title = 'An Error Occurred!';
      this.error.message = 'We couldn\'t retrieve your mail records, please pull down to try again.';
    });
  }

  createMsg() {
    this.modalCtrl.create({
      component: CreateMessageComponent
    }).then(el => {
      el.present();
    });
  }

  doRefresh(ev) {
    setTimeout(() => {
      this.getMails(this.user);
      ev.target.complete();
    }, 2000);
  }

}
