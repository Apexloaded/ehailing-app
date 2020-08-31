import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BookingPageRoutingModule } from './booking-routing.module';
import { BookingPage } from './booking.page';
import {SharedModule} from '../../modules/shared/shared.module';
import {Angular4PaystackModule} from "angular4-paystack";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BookingPageRoutingModule,
    SharedModule,
    Angular4PaystackModule.forRoot('pk_test_6a8eb7d53f4187cc1bb9373d71f25f2d9c5c45be'),
  ],
  declarations: [BookingPage]
})
export class BookingPageModule {}