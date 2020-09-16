import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagesPageRoutingModule } from './messages-routing.module';

import { MessagesPage } from './messages.page';
import { CreateMessageComponent } from '../../components/create-message/create-message.component';
import {SharedModule} from '../../modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MessagesPageRoutingModule,
    SharedModule
  ],
  declarations: [MessagesPage, CreateMessageComponent]
})
export class MessagesPageModule {}
