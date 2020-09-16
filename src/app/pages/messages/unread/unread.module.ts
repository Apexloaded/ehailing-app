import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnreadPageRoutingModule } from './unread-routing.module';

import { UnreadPage } from './unread.page';
import {UnreadMailsComponent} from '../../../components/unread-mails/unread-mails.component';
import {SharedModule} from '../../../modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnreadPageRoutingModule,
    SharedModule
  ],
  declarations: [UnreadPage, UnreadMailsComponent]
})
export class UnreadPageModule {}
