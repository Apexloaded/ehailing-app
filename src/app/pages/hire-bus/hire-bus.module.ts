import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HireBusPageRoutingModule } from './hire-bus-routing.module';
import { HireBusPage } from './hire-bus.page';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HireBusPageRoutingModule,
    SharedModule
  ],
  declarations: [HireBusPage]
})
export class HireBusPageModule {}
