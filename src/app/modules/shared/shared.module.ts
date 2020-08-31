import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PaymentOptionsComponent } from '../../components/payment-options/payment-options.component';
import { Angular4PaystackModule } from 'angular4-paystack';
import {ErrorComponent} from "../../components/error/error.component";



@NgModule({
  declarations: [
      ErrorComponent,
      PaymentOptionsComponent
  ],
  imports: [
    Angular4PaystackModule.forRoot('pk_test_6a8eb7d53f4187cc1bb9373d71f25f2d9c5c45be'),
    CommonModule,
    IonicModule
  ],
  exports: [
      ErrorComponent,
      PaymentOptionsComponent
  ]
})
export class SharedModule { }
