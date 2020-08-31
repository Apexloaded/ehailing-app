import {Component, Input, OnInit} from '@angular/core';
import {PAYMENT_GATEWAY} from '../../models';
import {PaystackOptions} from 'angular4-paystack';

@Component({
  selector: 'app-payment-options',
  templateUrl: './payment-options.component.html',
  styleUrls: ['./payment-options.component.scss'],
})
export class PaymentOptionsComponent implements OnInit {
  @Input() inpAmt: number;

  public payStack = {
    id: '1',
    name: PAYMENT_GATEWAY.PAYSTACK,
    img: '../../../assets/img/paystack.jpg',
    isClicked: false,
  };
  public flutterWave = {
      id: '2',
      name: PAYMENT_GATEWAY.FLUTTERWAVE,
      img: '../../../assets/img/flutter-wave.jpg',
      isClicked: false,
  };
  public unionBank = {
    id: '3',
    name: PAYMENT_GATEWAY.UNIONBANK,
    img: '../../../assets/img/union-back.jpg',
    isClicked: false,
  };

  options: PaystackOptions = {
    amount: this.inpAmt,
    email: 'odilichukwujoel@gmail.com',
    currency: 'NGN',
    ref: `${Math.ceil(Math.random() * 10e10)}`
  };

  constructor() { }

  ngOnInit() {
    console.log(this.inpAmt);
  }

  ionViewWillEnter() {
    console.log('will enter');
  }

  paymentInit() {
    console.log('Payment initialized');
    console.log(this.options);
    this.options.amount = this.inpAmt;
  }

  paymentDone() {
    const title = 'Payment successfull';
    console.log(title);
  }

  paymentCancel() {
    console.log('payment failed');
  }

  selectedPaymentMethod(pay) {
    switch (pay) {
      case this.payStack:
        this.flutterWave.isClicked = false;
        this.unionBank.isClicked = false;
        this.payStack.isClicked = true;
        break;
      case this.flutterWave:
        this.flutterWave.isClicked = true;
        this.unionBank.isClicked = false;
        this.payStack.isClicked = false;
        break;
      case this.unionBank:
        this.flutterWave.isClicked = false;
        this.unionBank.isClicked = true;
        this.payStack.isClicked = false;
        break;
    }
  }

}
