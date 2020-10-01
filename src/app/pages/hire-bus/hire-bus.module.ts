import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HireBusPageRoutingModule } from './hire-bus-routing.module';

import { HireBusPage } from './hire-bus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HireBusPageRoutingModule
  ],
  declarations: [HireBusPage]
})
export class HireBusPageModule {}
