import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutboxPageRoutingModule } from './outbox-routing.module';

import { OutboxPage } from './outbox.page';
import { OutboxComponent } from '../../../components/outbox/outbox.component';
import {SharedModule} from '../../../modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutboxPageRoutingModule,
    SharedModule
  ],
  declarations: [OutboxPage, OutboxComponent]
})
export class OutboxPageModule {}
