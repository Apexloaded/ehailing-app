import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController} from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UtilitiesService} from '../../services/utilities.service';
import {AuthService, EnvService} from '../../services';
import {Customer} from '../../models';
import {SupportService} from '../../services/support.service';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss'],
})
export class CreateMessageComponent implements OnInit {
  public mailForm: FormGroup;
  public user: Customer;
  public isLoading: boolean;

  constructor(
      private modalCtrl: ModalController,
      private fb: FormBuilder,
      private utilitiesService: UtilitiesService,
      private authService: AuthService,
      private envService: EnvService,
      private supportService: SupportService,
      private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.authService.getUser().then(res => {
      this.user = res;
      this.buildForm(this.user);
      this.isLoading = false;
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  buildForm(customer: Customer) {
    this.mailForm = this.fb.group({
      emailFrom: new FormControl(`${customer.email}`,{
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      emailTo: new FormControl(`${this.envService.supportEmail}`, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      emailSubject: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      emailMail: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  createMail(customer: Customer) {
    if (!this.mailForm.valid) {
      this.utilitiesService.presentToast('Fill in all fieids', 3000);
      return;
    }

    const data = {
      sender: 'CUSTOMER',
      senderId: customer.id,
      senderEmail: this.mailForm.controls.emailFrom.value,
      recipient: 'STAFF',
      recipientEmail: this.envService.supportEmail,
      subject: this.mailForm.controls.emailSubject.value,
      body: this.mailForm.controls.emailMail.value
    };

    this.loadingCtrl.create({
      spinner: 'dots'
    }).then(el => {
      el.present().then(() => {
        this.supportService.sendMail(data).then(res => {
          el.dismiss().then(() => {
            this.mailForm.reset();
          });
        }).catch(e => {
          el.dismiss().then(() => {
            console.log(e);
          });
        });
      });
    });
  }

}
