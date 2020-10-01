import {Component, Input, OnInit} from '@angular/core';
import {PAYMENT_GATEWAY, PAYMENT_METHOD} from '../../models';
import {PaystackOptions} from 'angular4-paystack';
import {ModalController, NavParams} from '@ionic/angular';
import {RaveOptions} from "angular-rave";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-payment-options',
  templateUrl: './payment-options.component.html',
  styleUrls: ['./payment-options.component.scss'],
})
export class PaymentOptionsComponent implements OnInit {
  public inputData;

  /***************************************************************************************************
   **************************************PAYSTACK START***********************************************
   ***************************************************************************************************/
      public payStack = {
        id: '1',
        name: PAYMENT_GATEWAY.PAYSTACK,
        img: '../../../assets/img/paystack.jpg',
        isClicked: false,
      };

      public payStackOptions: PaystackOptions = {
        amount: null,
        email: null,
        currency: 'NGN',
        ref: `${Math.ceil(Math.random() * 10e10)}`
      };
  /***************************************************************************************************
   **************************************PAYSTACK ENDS************************************************
   ***************************************************************************************************/


  /***************************************************************************************************
   **************************************FLUTTERWAVE START********************************************
   ***************************************************************************************************/
      public flutterWave = {
          id: '2',
          name: PAYMENT_GATEWAY.FLUTTERWAVE,
          img: '../../../assets/img/flutter-wave.jpg',
          isClicked: false,
      };

      public flutterWaveOption: RaveOptions = {
        PBFPubKey: environment.FLUTTERWAVE_PUBLIC_KEY,
        customer_email: null,
        customer_firstname: null,
        customer_lastname: null,
        amount: null,
        customer_phone: null,
        txref: `${Math.ceil(Math.random() * 10e10)}`,
        currency: 'NGN'
      };
  /***************************************************************************************************
   **************************************FLUTTERWAVE ENDS*********************************************
   ***************************************************************************************************/


  /***************************************************************************************************
   ****************************************UNION START************************************************
   ***************************************************************************************************/
      public unionBank = {
        id: '3',
        name: PAYMENT_GATEWAY.UNIONBANK,
        img: '../../../assets/img/union-back.jpg',
        isClicked: false,
      };
  /***************************************************************************************************
   ******************************************UNION END************************************************
   ***************************************************************************************************/

  constructor(
      private navParams: NavParams,
      private modalCtrl: ModalController
  ) {
    this.inputData = this.navParams.data;
    this.payStackOptions.amount = this.inputData.amount * 100; // PayStack Amount init
    this.payStackOptions.email = this.inputData.user.email; // PayStack User email init

    this.flutterWaveOption.amount = this.inputData.amount; // FlutterWave amount init
    this.flutterWaveOption.customer_email = this.inputData.user.email; // FlutterWave User email init
    this.flutterWaveOption.customer_firstname = this.inputData.user.surname; // FlutterWave user first name init
    this.flutterWaveOption.customer_lastname = this.inputData.user.otherName; // FlutterWave user last name init
    this.flutterWaveOption.customer_phone = this.inputData.user.phone; // FlutterWave user phone init
  }

  ngOnInit() { }

  close() {
      this.modalCtrl.dismiss();
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


  /***************************************************************************************************
   ***************************************PAYSTACK START***********************************************
   ***************************************************************************************************/
      payStackInit() { }

      payStackDone(ref) {
        const data = {
          paymentMethod: PAYMENT_METHOD.GATEWAY,
          paymentGateway: this.payStack.name,
          ...ref
        };
        this.modalCtrl.dismiss(data, 'payStack');
      }

      payStackCancel() {
        this.modalCtrl.dismiss(null, 'payStack');
      }
  /***************************************************************************************************
   ***************************************PAYSTACK ENDS***********************************************
   ***************************************************************************************************/


  /***************************************************************************************************
   *************************************FLUTTERWAVE START*********************************************
   ***************************************************************************************************/
      flutterWaveInit() { }

      flutterWaveDone(ref) {
        const data = {
          paymentMethod: PAYMENT_METHOD.GATEWAY,
          paymentGateway: this.flutterWave.name,
          ...ref
        };
        this.modalCtrl.dismiss(data, 'flutterWave');
      }

      flutterWaveCancel() {
        this.modalCtrl.dismiss(null, 'flutterWave');
      }
  /***************************************************************************************************
   *************************************FLUTTERWAVE ENDS**********************************************
   ***************************************************************************************************/
}
