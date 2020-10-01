import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BookingPageRoutingModule } from './booking-routing.module';
import { BookingPage } from './booking.page';
import { SharedModule } from '../../modules/shared/shared.module';
import { Angular4PaystackModule } from 'angular4-paystack';
import {AngularRaveModule} from 'angular-rave';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BookingPageRoutingModule,
    SharedModule
  ],
  declarations: [BookingPage]
})
export class BookingPageModule {}
