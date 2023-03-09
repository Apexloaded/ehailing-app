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
import { environment } from 'src/environments/environment.prod';



@NgModule({
  declarations: [
      ErrorComponent,
      PaymentOptionsComponent,
      ProfilePopoverComponent,
      ResetPasswordComponent
  ],
  imports: [
      Angular4PaystackModule.forRoot(environment.PAYSTACK_KEY),
      AngularRaveModule.forRoot({
          key: environment.FLUTTERWAVE_KEY,
          isTest: false
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
