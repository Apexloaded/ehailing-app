import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PickupPageRoutingModule } from './pickup-routing.module';
import { PickupPage } from './pickup.page';
import { SharedModule } from '../../modules/shared/shared.module';
import { PickupDetailsComponent } from '../../components/pickup-details/pickup-details.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    PickupPageRoutingModule,
    SharedModule
  ],
  declarations: [PickupPage, PickupDetailsComponent]
})
export class PickupPageModule {}
