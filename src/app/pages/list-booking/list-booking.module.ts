import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListBookingPageRoutingModule } from './list-booking-routing.module';

import { ListBookingPage } from './list-booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListBookingPageRoutingModule
  ],
  declarations: [ListBookingPage]
})
export class ListBookingPageModule {}
