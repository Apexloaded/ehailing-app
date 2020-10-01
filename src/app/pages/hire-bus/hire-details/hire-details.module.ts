import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HireDetailsPageRoutingModule } from './hire-details-routing.module';

import { HireDetailsPage } from './hire-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HireDetailsPageRoutingModule
  ],
  declarations: [HireDetailsPage]
})
export class HireDetailsPageModule {}
