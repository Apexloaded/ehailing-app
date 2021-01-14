import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PaymentOptionsComponent } from '../../components/payment-options/payment-options.component';
import { Angular4PaystackModule } from 'angular4-paystack';
import { ErrorComponent } from '../../components/error/error.component';
import { ProfilePopoverComponent } from '../../components/profile-popover/profile-popover.component';
import { AngularRaveModule } from 'angular-rave';
import { ResetPasswordComponent } from '../../components/reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
      ErrorComponent,
      PaymentOptionsComponent,
      ProfilePopoverComponent,
      ResetPasswordComponent
  ],
  imports: [
      Angular4PaystackModule.forRoot('pk_test_6a8eb7d53f4187cc1bb9373d71f25f2d9c5c45be'),
      AngularRaveModule.forRoot({
          key: 'FLWPUBK_TEST-0d6991be7e23edefb730d387a8cac8e1-X',
          isTest: true
      }),
      CommonModule,
      IonicModule,
      ReactiveFormsModule
  ],
  exports: [
      ErrorComponent,
      PaymentOptionsComponent,
      ProfilePopoverComponent,
      AngularRaveModule,
      Angular4PaystackModule,
      ResetPasswordComponent
  ],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
